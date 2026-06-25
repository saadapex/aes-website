/**
 * Google Workspace SMTP email helper — sends transactional email through the
 * AES mailbox via Gmail SMTP (nodemailer). Used by the lead-magnet route to
 * send a confirmation email with a download LINK to the gated PDF.
 *
 * Why a link and not an attachment:
 *   The RFP PDF is ~14.5 MB. Fetching + base64-encoding + uploading it over
 *   SMTP inside a serverless function regularly exceeds the function timeout
 *   and brushes against Gmail's 25 MB message cap (large attachments also get
 *   spam-filtered). The file is already publicly hosted, so we email a button
 *   that links straight to it. This returns in ~1s and is far more reliable.
 *
 * Required env vars (set in Vercel project settings):
 *   GMAIL_USER          — the Google Workspace mailbox login (saad.usmani@apexsolutions.io)
 *   GMAIL_APP_PASSWORD  — a Google "App Password" for that account
 *                         (requires 2-Step Verification; create at
 *                          https://myaccount.google.com/apppasswords)
 *
 * No DNS changes needed — mail is sent by Google's own servers, which
 * apexsolutions.io is already authorized for.
 */

import nodemailer from "nodemailer";

const FROM_NAME = "Apex Enterprise Solutions";

interface SendPdfEmailArgs {
  to: string;
  firstName: string;
  subject: string;
  resourceLabel: string;
  /** Publicly reachable URL of the PDF — linked (not attached) in the email. */
  downloadUrl: string;
}

export async function sendPdfEmail(args: SendPdfEmailArgs): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("[Email] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping send");
    return false;
  }

  const greeting = args.firstName ? `Hi ${args.firstName},` : "Hi,";

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1F2933; max-width: 560px; margin: 0 auto;">
      <p>${greeting}</p>
      <p>Thanks for your interest — your <strong>${args.resourceLabel}</strong> is ready to download:</p>
      <p style="margin: 24px 0;">
        <a href="${args.downloadUrl}"
           style="background:#FF6B00; color:#ffffff; text-decoration:none; font-weight:bold; padding:14px 26px; border-radius:8px; display:inline-block; font-size:15px;">
          Download the RFP Template (PDF) &rarr;
        </a>
      </p>
      <p style="font-size:13px; color:#4E6575;">If the button doesn't work, copy and paste this link into your browser:<br/>
        <a href="${args.downloadUrl}" style="color:#006FB9; word-break:break-all;">${args.downloadUrl}</a>
      </p>
      <p>The form fields are interactive: open it in Adobe Acrobat or any modern PDF reader, drop in your project details, and send it out.</p>
      <p>If you'd like AES to review your scope or bid the work, just reply to this email or reach us at <a href="mailto:info@apexsolutions.io" style="color:#006FB9;">info@apexsolutions.io</a>.</p>
      <p style="margin-top: 28px;">Apex Enterprise Solutions<br/>
      <span style="color:#4E6575; font-size: 13px;">Fiber · Structured Cabling · Rack-and-Stack · AI/Data Center Deployments</span><br/>
      <a href="https://www.apexsolutions.io" style="color:#006FB9; font-size: 13px;">www.apexsolutions.io</a> · <span style="color:#4E6575; font-size: 13px;">(669) 251-7810</span></p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${user}>`,
      to: args.to,
      replyTo: `"${FROM_NAME}" <info@apexsolutions.io>`,
      subject: args.subject,
      html,
    });
    return true;
  } catch (err) {
    console.error("[Email] SMTP send failed", err);
    return false;
  }
}

interface SendNotificationArgs {
  /** Where the internal notification goes. Defaults to info@apexsolutions.io. */
  to?: string;
  subject: string;
  /** Plain field rows rendered into a simple table: [label, value][]. */
  fields: [string, string][];
  /** Optional reply-to so AES can reply straight to the applicant/lead. */
  replyTo?: string;
  /** Optional file attachments (e.g. an uploaded resume). */
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}

/**
 * Sends an internal notification email to AES (e.g. a job application or
 * partner enquiry). Returns false if SMTP isn't configured — callers should
 * treat email as best-effort and never block the user flow on it.
 */
export async function sendNotificationEmail(args: SendNotificationArgs): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("[Email] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping notification");
    return false;
  }

  const rows = args.fields
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px; border-bottom:1px solid #E5EAF0; font-weight:bold; color:#06284C; vertical-align:top; white-space:nowrap;">${label}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #E5EAF0; color:#1F2933;">${value.replace(/\n/g, "<br/>")}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#1F2933; max-width:600px; margin:0 auto;">
      <h2 style="color:#06284C; font-size:18px;">${args.subject}</h2>
      <table style="border-collapse:collapse; width:100%; font-size:14px;">${rows}</table>
      <p style="color:#4E6575; font-size:12px; margin-top:20px;">Sent from the apexsolutions.io website.</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${FROM_NAME} Website" <${user}>`,
      to: args.to || "info@apexsolutions.io",
      replyTo: args.replyTo,
      subject: args.subject,
      html,
      attachments: args.attachments,
    });
    return true;
  } catch (err) {
    console.error("[Email] Notification send failed", err);
    return false;
  }
}
