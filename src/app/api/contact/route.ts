import { NextRequest, NextResponse } from "next/server";
import { upsertHubSpotContact } from "@/lib/hubspot";
import { guardBodySize, isHoneypotFilled, textField, emailField, listField } from "@/lib/form-security";

const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";

export async function POST(req: NextRequest) {
  try {
    guardBodySize(req, 32 * 1024);
    const data = await req.formData();
    // Hidden bot-trap; avoid creating leads for obvious automated spam.
    if (isHoneypotFilled(data)) return NextResponse.redirect(new URL("/thank-you", req.url), 303);

    const name = textField(data, "name", 120);
    const email = emailField(data, "email");
    const phone = textField(data, "phone", 40);
    const company = textField(data, "company", 160);
    const locations = textField(data, "locations", 240);
    const startDate = textField(data, "startDate", 120);
    const services  = listField(data, "services");
    const scope = textField(data, "scope", 2200);

    if (!email) return NextResponse.redirect(new URL("/contact?error=1", req.url), 303);

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
        lead_type:        "Contact Form",
        service_interest: services,
        message: `Locations: ${locations}\nStart Date: ${startDate}\nScope: ${scope}`,
      });
    }

    return NextResponse.redirect(new URL("/thank-you", req.url), 303);
  } catch (err) {
    console.error("[Contact Form Error]", err);
    return NextResponse.redirect(new URL("/contact?error=1", req.url), 303);
  }
}
