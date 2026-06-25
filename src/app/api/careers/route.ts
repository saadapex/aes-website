import { NextRequest, NextResponse } from "next/server";
import { upsertHubSpotContact } from "@/lib/hubspot";
import { sendNotificationEmail } from "@/lib/email";

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";

// Keep resume uploads sane — resumes are small. Reject anything over 8 MB.
const MAX_RESUME_BYTES = 8 * 1024 * 1024;
const ALLOWED_EXT = [".pdf", ".doc", ".docx", ".rtf", ".txt", ".odt"];

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const name     = (data.get("name")     as string) || "";
    const email    = (data.get("email")    as string) || "";
    const phone    = (data.get("phone")    as string) || "";
    const role     = (data.get("role")     as string) || "";
    const location = (data.get("location") as string) || "";
    const message  = (data.get("message")  as string) || "";

    if (!email) {
      return NextResponse.redirect(new URL("/careers?error=1#apply", req.url), 303);
    }

    // Read the uploaded resume (optional but expected).
    let attachments: { filename: string; content: Buffer; contentType?: string }[] | undefined;
    let resumeNote = "No file attached";
    const resume = data.get("resume");
    if (resume && typeof resume === "object" && "arrayBuffer" in resume) {
      const file = resume as File;
      if (file.size > 0) {
        const lower = file.name.toLowerCase();
        const okExt = ALLOWED_EXT.some((ext) => lower.endsWith(ext));
        if (!okExt) {
          return NextResponse.redirect(new URL("/careers?error=filetype#apply", req.url), 303);
        }
        if (file.size > MAX_RESUME_BYTES) {
          return NextResponse.redirect(new URL("/careers?error=filesize#apply", req.url), 303);
        }
        const buf = Buffer.from(await file.arrayBuffer());
        attachments = [
          {
            filename: file.name,
            content: buf,
            contentType: file.type || "application/octet-stream",
          },
        ];
        resumeNote = `Attached: ${file.name}`;
      }
    }

    const [firstname, ...rest] = name.split(" ");
    const lastname = rest.join(" ");

    // Capture to CRM — best-effort. (File isn't sent to HubSpot, just the metadata.)
    if (HS_TOKEN) {
      try {
        await upsertHubSpotContact(HS_TOKEN, {
          email,
          firstname: firstname || "",
          lastname:  lastname  || "",
          phone,
          hs_lead_status:   "NEW",
          lifecyclestage:   "lead",
          lead_type:        "Career Application",
          service_interest: role,
          message: `Role: ${role}\nLocation/Coverage: ${location}\nResume: ${resumeNote}\nNotes: ${message}`,
        });
      } catch (hsErr) {
        console.error("[Careers] HubSpot upsert failed (continuing)", hsErr);
      }
    }

    // Email the application + attached resume straight to AES. Replies go to
    // the applicant so the team can respond directly.
    const sent = await sendNotificationEmail({
      to: "info@apexsolutions.io",
      replyTo: email,
      subject: `New Career Application${role ? ` — ${role}` : ""}`,
      fields: [
        ["Name", name],
        ["Email", email],
        ["Phone", phone],
        ["Role / Trade", role],
        ["Location / Coverage", location],
        ["Resume", resumeNote],
        ["Notes", message],
      ],
      attachments,
    });

    // The uploaded file only leaves the server via this email — if email isn't
    // configured yet, surface an error so the applicant can email it directly
    // rather than silently losing the resume.
    if (!sent) {
      return NextResponse.redirect(new URL("/careers?error=email#apply", req.url), 303);
    }

    return NextResponse.redirect(new URL("/thank-you", req.url), 303);
  } catch (err) {
    console.error("[Careers Form Error]", err);
    return NextResponse.redirect(new URL("/careers?error=1#apply", req.url), 303);
  }
}
