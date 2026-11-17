import { NextRequest, NextResponse } from "next/server";
import { upsertHubSpotContact } from "@/lib/hubspot";
import { sendNotificationEmail } from "@/lib/email";
import { guardBodySize, isHoneypotFilled, textField, emailField, verifiedResumeMime, FormValidationError } from "@/lib/form-security";

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";

// Keep resume uploads sane — resumes are small. Reject anything over 8 MB.
const MAX_RESUME_BYTES = 8 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    guardBodySize(req, 9 * 1024 * 1024);
    const data = await req.formData();
    if (isHoneypotFilled(data)) return NextResponse.redirect(new URL("/thank-you", req.url), 303);

    const name = textField(data, "name", 120);
    const email = emailField(data, "email");
    const phone = textField(data, "phone", 40);
    const role = textField(data, "role", 160);
    const location = textField(data, "location", 240);
    const message = textField(data, "message", 2200);

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
        if (file.size > MAX_RESUME_BYTES) {
          return NextResponse.redirect(new URL("/careers?error=filesize#apply", req.url), 303);
        }
        const buf = Buffer.from(await file.arrayBuffer());
        let verifiedMime: string;
        try {
          verifiedMime = verifiedResumeMime(file.name, buf);
        } catch (error) {
          if (error instanceof FormValidationError) {
            return NextResponse.redirect(new URL("/careers?error=filetype#apply", req.url), 303);
          }
          throw error;
        }
        // WARNING: signature verification is NOT malware scanning. A quarantined
        // scan-before-delivery workflow is required before production acceptance.
        attachments = [
          {
            filename: file.name,
            content: buf,
            contentType: verifiedMime,
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
