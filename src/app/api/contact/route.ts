import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const payload = {
      name:       data.get("name"),
      email:      data.get("email"),
      phone:      data.get("phone"),
      company:    data.get("company"),
      locations:  data.get("locations"),
      startDate:  data.get("startDate"),
      services:   data.getAll("services"),
      scope:      data.get("scope"),
      nda:        data.get("nda") === "on",
      utm_source:   data.get("utm_source"),
      utm_medium:   data.get("utm_medium"),
      utm_campaign: data.get("utm_campaign"),
    };

    // TODO: Wire to CRM (HubSpot / Pipedrive webhook)
    // await fetch(process.env.CRM_WEBHOOK_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });

    console.log("[Contact Form Submission]", payload);

    // Redirect to thank-you page (GA4 conversion fires on page load)
    return NextResponse.redirect(new URL("/thank-you", req.url));
  } catch (err) {
    console.error("[Contact Form Error]", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
