import { NextRequest, NextResponse } from "next/server";

const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const name     = (data.get("name")     as string) || "";
    const email    = (data.get("email")    as string) || "";
    const company  = (data.get("company")  as string) || "";
    const phone    = (data.get("phone")    as string) || "";
    const type     = (data.get("type")     as string) || "";
    const coverage = (data.get("coverage") as string) || "";
    const message  = (data.get("message")  as string) || "";
    const services = data.getAll("services").join(", ");

    if (!email) return NextResponse.redirect(new URL("/partners?error=1", req.url));

    const [firstname, ...rest] = name.split(" ");
    const lastname = rest.join(" ");

    if (HS_TOKEN) {
      await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HS_TOKEN}`,
        },
        body: JSON.stringify({
          properties: {
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
          },
        }),
      });
    }

    return NextResponse.redirect(new URL("/thank-you", req.url));
  } catch (err) {
    console.error("[Partner Form Error]", err);
    return NextResponse.redirect(new URL("/partners?error=1", req.url));
  }
}
