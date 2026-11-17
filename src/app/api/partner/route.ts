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
    const company = textField(data, "company", 160);
    const phone = textField(data, "phone", 40);
    const type = textField(data, "type", 120);
    const coverage = textField(data, "coverage", 240);
    const message = textField(data, "message", 2200);
    const services = listField(data, "services");

    if (!email) return NextResponse.redirect(new URL("/partners?error=1", req.url), 303);

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
        lead_type:        "Partner Inquiry",
        company_type:     type,
        service_interest: services,
        message: `Coverage: ${coverage}\n${message}`,
      });
    }

    return NextResponse.redirect(new URL("/thank-you", req.url), 303);
  } catch (err) {
    console.error("[Partner Form Error]", err);
    return NextResponse.redirect(new URL("/partners?error=1", req.url), 303);
  }
}
