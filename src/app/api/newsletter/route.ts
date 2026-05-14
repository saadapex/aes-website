import { NextRequest, NextResponse } from "next/server";

const HS_TOKEN      = process.env.HUBSPOT_ACCESS_TOKEN || "";
const BEEHIIV_KEY   = process.env.BEEHIIV_API_KEY || "";
const BEEHIIV_PUB   = process.env.BEEHIIV_PUBLICATION_ID || "";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const [firstname, ...rest] = (name || "").split(" ");
    const lastname = rest.join(" ");

    const results = await Promise.allSettled([

      // ── Beehiiv ──────────────────────────────────────────────
      BEEHIIV_KEY && BEEHIIV_PUB
        ? fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB}/subscriptions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${BEEHIIV_KEY}`,
            },
            body: JSON.stringify({
              email,
              first_name:          firstname || "",
              last_name:           lastname  || "",
              reactivate_existing: true,
              send_welcome_email:  true,
              utm_source:          "website",
              utm_medium:          "popup",
              utm_campaign:        "newsletter-signup",
            }),
          })
        : Promise.resolve(null),

      // ── HubSpot ──────────────────────────────────────────────
      HS_TOKEN
        ? fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${HS_TOKEN}`,
            },
            body: JSON.stringify({
              properties: {
                email,
                firstname:      firstname || "",
                lastname:       lastname  || "",
                hs_lead_status: "NEW",
                lifecyclestage: "subscriber",
                lead_type:      "Newsletter Signup",
              },
            }),
          })
        : Promise.resolve(null),
    ]);

    // Log any failures but don't block the response
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`Newsletter integration ${i} failed:`, r.reason);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Newsletter API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
