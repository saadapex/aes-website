/**
 * Server-side validation and output encoding for public AES website forms.
 * This is defense in depth: it does NOT replace distributed edge rate limiting,
 * a CAPTCHA/bot challenge, or malware scanning of uploads.
 */
export class FormValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormValidationError";
  }
}

export function cleanText(value: unknown, maxLength = 160): string {
  if (typeof value !== "string") throw new FormValidationError("Invalid text field");
  const cleaned = value.trim();
  if (cleaned.length > maxLength) throw new FormValidationError("Text field too long");
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(cleaned)) {
    throw new FormValidationError("Invalid control character");
  }
  return cleaned;
}

export function textField(data: FormData, name: string, maxLength = 160): string {
  const values = data.getAll(name);
  if (values.length === 0) return "";
  if (values.length !== 1) throw new FormValidationError("Duplicate field");
  return cleanText(values[0], maxLength);
}

export function emailText(value: unknown): string {
  const email = cleanText(value, 254).toLowerCase();
  // Conservative mailbox validation. Final deliverability is verified downstream.
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(email)) {
    throw new FormValidationError("Invalid email");
  }
  return email;
}

export function emailField(data: FormData, name = "email"): string {
  return emailText(textField(data, name, 254));
}

export function listField(
  data: FormData,
  name: string,
  maxCount = 20,
  maxItemLength = 120
): string {
  const values = data.getAll(name);
  if (values.length > maxCount) throw new FormValidationError("Too many selections");
  return values.map(value => cleanText(value, maxItemLength)).filter(Boolean).join(", ");
}

export function isHoneypotFilled(data: FormData): boolean {
  return textField(data, "website", 200) !== "";
}

export function guardBodySize(req: Request, maxBytes: number): void {
  const raw = req.headers.get("content-length");
  if (!raw) return; // Enforce payload caps at the CDN / gateway as well.
  const n = Number(raw);
  if (!Number.isSafeInteger(n) || n < 0 || n > maxBytes) {
    throw new FormValidationError("Invalid request size");
  }
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, ch => {
    const escapes: Record<string, string> = {
      "&": "&amp;", "<": "&lt;", ">": "&gt;",
      '"': "&quot;", "'": "&#39;",
    };
    return escapes[ch];
  });
}

export function safeEmailSubject(subject: string): string {
  return cleanText(subject, 180).replace(/[\r\n]/g, " ");
}

/**
 * Basic signature validation for uploads; NOT a malware scanner.
 * Office ZIP containers need antivirus and content analysis before distribution.
 */
export function verifiedResumeMime(filename: string, bytes: Uint8Array): string {
  const safeName = cleanText(filename, 128);
  if (/[\\/]/.test(safeName) || safeName.startsWith(".")) {
    throw new FormValidationError("Invalid filename");
  }
  if (bytes.length === 0 || bytes.length > 8 * 1024 * 1024) {
    throw new FormValidationError("Invalid file size");
  }
  const ext = safeName.slice(safeName.lastIndexOf(".")).toLowerCase();
  const starts = (arr: number[]) => arr.every((b, i) => bytes[i] === b);
  if (ext === ".pdf" && starts([0x25, 0x50, 0x44, 0x46, 0x2d])) return "application/pdf";
  if (ext === ".doc" && starts([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) {
    return "application/msword";
  }
  if ((ext === ".docx" || ext === ".odt") && starts([0x50, 0x4b, 0x03, 0x04])) {
    return ext === ".docx"
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "application/vnd.oasis.opendocument.text";
  }
  if (ext === ".rtf" && starts([0x7b, 0x5c, 0x72, 0x74, 0x66])) return "application/rtf";
  if (ext === ".txt") {
    try {
      const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      if (!decoded.includes("\u0000") && !/[\u0001-\u0008\u000B\u000C\u000E-\u001F]/.test(decoded)) {
        return "text/plain";
      }
    } catch { /* invalid UTF-8 */ }
  }
  throw new FormValidationError("File content does not match an allowed resume format");
}
