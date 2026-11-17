import { NextRequest, NextResponse } from "next/server";
import { upsertHubSpotContact } from "@/lib/hubspot";
import { sendPdfEmail } from "@/lib/email";
import { guardBodySize, isHoneypotFilled, textField, emailField } from "@/lib/form-security";

// nodemailer needs the Node.js runtime (not Edge). The email is now
// lightweight (a link, not a 14.5MB attachment) so it returns quickly well
// within the default function timeout.
export const runtime = "nodejs";

const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";
const SITE_URL = "https://www.apexsolutions.io";

// Map a resource slug to the actual PDF path on /public/assets/
const RESOURCE_FILES: Record<string, { file: string; filename: string; label: string }> = {
  "rfp-template": {
    file: "/assets/AES_Structured_Cabling_RFP_Template_v2.2.pdf",
    filename: "AES_Structured_Cabling_RFP_Template_v2.2.pdf",
    label: "Structured Cabling RFP Template v2.2",
  },
};

export async function POST(req: NextRequest) {
  try {
    guardBodySize(req, 16 * 1024);
    const data = await req.formData();
    if (isHoneypotFilled(data)) return NextResponse.redirect(new URL("/resources", req.url), 303);

    const resource = textField(data, "resource", 80) || "rfp-template";
    const name = textField(data, "name", 120);
    const email = emailField(data, "email");
    const company = textField(data, "company", 160);
    const role = textField(data, "role", 120);
    const phone = textField(data, "phone", 40);

    const resourceConfig = RESOURCE_FILES[resource];
    if (!resourceConfig) {
      return NextResponse.redirect(new URL(`/resources?error=unknown`, req.url), 303);
    }
    if (!email) {
      return NextResponse.redirect(new URL(`/resources/${resource}?error=1`, req.url), 303);
    }

    const [firstname, ...rest] = name.split(" ");
    const lastname = rest.join(" ");

    // Capture the lead. Best-effort — never block file delivery on CRM.
    if (HS_TOKEN) {
      try {
        await upsertHubSpotContact(HS_TOKEN, {
          email,
          firstname: firstname || "",
          lastname:  lastname  || "",
          company,
          phone,
          hs_lead_status:   "NEW",
          lifecyclestage:   "lead",
          lead_type:        "Lead Magnet — Resource Request",
          service_interest: resourceConfig.label,
          message: `Requested resource: ${resourceConfig.label}\nRole: ${role}`,
        });
      } catch (hsErr) {
        console.error("[Lead Magnet] HubSpot upsert failed (continuing)", hsErr);
      }
    }

    // Send a confirmation email with a download LINK. Best-effort — the visitor
    // still gets the file via the thank-you page even if email isn't configured.
    try {
      await sendPdfEmail({
        to: email,
        firstName: firstname || "",
        subject: `Your ${resourceConfig.label} from AES`,
        resourceLabel: resourceConfig.label,
        downloadUrl: `${SITE_URL}${resourceConfig.file}`,
      });
    } catch (mailErr) {
      console.error("[Lead Magnet] Email send failed (continuing)", mailErr);
    }

    // Always deliver: the thank-you page auto-downloads the PDF and shows a
    // manual download button, so success never depends on email or CRM.
    return NextResponse.redirect(
      new URL(`/resources/${resource}/thanks`, req.url),
      303,
    );
  } catch (err) {
    console.error("[Lead Magnet Error]", err);
    return NextResponse.redirect(new URL(`/resources?error=1`, req.url), 303);
  }
}
