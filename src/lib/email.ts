/**
 * Google Workspace SMTP email helper — sends transactional email through the
 * AES mailbox via Gmail SMTP (nodemailer). Used by the lead-magnet route to
 * deliver gated PDFs to the lead's inbox.
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
  /** Publicly reachable URL of the PDF — fetched and attached. */
  attachmentUrl: string;
  attachmentFilename: string;
}

export async function sendPdfEmail(args: SendPdfEmailArgs): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("[Email] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping send");
    return false;
  }

  // Fetch the PDF so it can be attached.
  const pdfRes = await fetch(args.attachmentUrl);
  if (!pdfRes.ok) {
    console.error("[Email] Could not fetch attachment", args.attachmentUrl, pdfRes.status);
    return false;
  }
  const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer());

  const greeting = args.firstName ? `Hi ${args.firstName},` : "Hi,";

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1F2933; max-width: 560px; margin: 0 auto;">
      <p>${greeting}</p>
      <p>Thanks for your interest — the <strong>${args.resourceLabel}</strong> is attached to this email.</p>
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
      attachments: [
        {
          filename: args.attachmentFilename,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });
    return true;
  } catch (err) {
    console.error("[Email] SMTP send failed", err);
    return false;
  }
}
