import { NextRequest, NextResponse } from "next/server";
import { upsertHubSpotContact } from "@/lib/hubspot";

const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const name         = (data.get("name")         as string) || "";
    const email        = (data.get("email")         as string) || "";
    const company      = (data.get("company")       as string) || "";
    const phone        = (data.get("phone")         as string) || "";
    const businessType = (data.get("businessType")  as string) || "";
    const coverage     = (data.get("coverage")      as string) || "";
    const certs        = (data.get("certs")         as string) || "";
    const notes        = (data.get("notes")         as string) || "";
    const trades       = data.getAll("trades").join(", ");

    if (!email) return NextResponse.redirect(new URL("/vendor-registration?error=1", req.url));

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
        lead_type:        "Vendor Registration",
        company_type:     businessType,
        service_interest: trades,
        message: `Coverage: ${coverage}\nCerts: ${certs}\nNotes: ${notes}`,
      });
    }

    return NextResponse.redirect(new URL("/thank-you", req.url));
  } catch (err) {
    console.error("[Vendor Form Error]", err);
    return NextResponse.redirect(new URL("/vendor-registration?error=1", req.url));
  }
}
