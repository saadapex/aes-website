import { NextRequest, NextResponse } from "next/server";
import { upsertHubSpotContact } from "@/lib/hubspot";

const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";

// Map a resource slug to the actual PDF path on /public/assets/
const RESOURCE_FILES: Record<string, { file: string; label: string }> = {
  "rfp-template": {
    file: "/assets/AES_Structured_Cabling_RFP_Template_v2.2.pdf",
    label: "Structured Cabling RFP Template v2.2",
  },
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const resource = (data.get("resource") as string) || "rfp-template";
    const name     = (data.get("name")     as string) || "";
    const email    = (data.get("email")    as string) || "";
    const company  = (data.get("company")  as string) || "";
    const role     = (data.get("role")     as string) || "";
    const phone    = (data.get("phone")    as string) || "";

    const resourceConfig = RESOURCE_FILES[resource];
    if (!resourceConfig) {
      return NextResponse.redirect(new URL(`/resources?error=unknown`, req.url), 303);
    }
    if (!email) {
      return NextResponse.redirect(new URL(`/resources/${resource}?error=1`, req.url), 303);
    }

    const [firstname, ...rest] = name.split(" ");
    const lastname = rest.join(" ");

    if (HS_TOKEN) {
      await upsertHubSpotContact(HS_TOKEN, {
        email,
        firstname: firstname || "",
        lastname:  lastname  || "",
        company,
        phone,
        hs_lead_status:   "NEW",
        lifecyclestage:   "lead",
        lead_type:        "Lead Magnet — Resource Download",
        service_interest: resourceConfig.label,
        message: `Requested resource: ${resourceConfig.label}\nRole: ${role}`,
      });
    }

    // Redirect to the thank-you page that auto-triggers the download.
    return NextResponse.redirect(
      new URL(`/resources/${resource}/thanks`, req.url),
      303,
    );
  } catch (err) {
    console.error("[Lead Magnet Error]", err);
    return NextResponse.redirect(new URL(`/resources?error=1`, req.url), 303);
  }
}
