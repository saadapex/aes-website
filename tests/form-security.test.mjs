import test from "node:test";
import assert from "node:assert/strict";
import {
  FormValidationError, cleanText, textField, emailField, emailText,
  listField, isHoneypotFilled, guardBodySize,
  escapeHtml, safeEmailSubject, verifiedResumeMime
} from "../src/lib/form-security.ts";

const invalid = (fn) => assert.throws(fn, FormValidationError);
test("escapes untrusted HTML in email output", () => {
  assert.equal(escapeHtml('<img src="x" onerror=\'alert(1)\'>'), '&lt;img src=&quot;x&quot; onerror=&#39;alert(1)&#39;&gt;');
  assert.equal(escapeHtml(null), "");
});
test("bounds text fields and rejects control chars", () => {
  assert.equal(cleanText("   hello   ", 5), "hello");
  invalid(() => cleanText("abcdef", 5));
  invalid(() => cleanText("a\u0000b"));
  invalid(() => cleanText({ text: "not-a-string" }));
});
test("rejects malformed and header-injection emails", () => {
  assert.equal(emailText("  USER@Example.org  "), "user@example.org");
  invalid(() => emailText("not-an-email"));
  invalid(() => emailText("a@b.co\r\nBcc:evil@example.org"));
});
test("form fields reject duplicates, files and overlarge selections", () => {
  const data = new FormData();
  data.append("email", "test@example.org");
  assert.equal(emailField(data), "test@example.org");
  data.append("email", "attacker@example.org");
  invalid(() => emailField(data));
  const more = new FormData();
  more.append("services", "fiber");
  more.append("services", "rack");
  assert.equal(listField(more, "services"), "fiber, rack");
  invalid(() => listField(more, "services", 1));
  const fileData = new FormData();
  fileData.append("name", new Blob(["bytes"]), "resume.txt");
  invalid(() => textField(fileData, "name"));
});
test("flags populated honeypot inputs", () => {
  const form = new FormData();
  assert.equal(isHoneypotFilled(form), false);
  form.set("website", "http://spam.example");
  assert.equal(isHoneypotFilled(form), true);
});
test("request size guard rejects a declared oversized request", () => {
  const okay = new Request("https://example.invalid/test", { headers: { "content-length": "100" }});
  guardBodySize(okay, 100);
  const tooLarge = new Request("https://example.invalid/test", { headers: { "content-length": "101" }});
  invalid(() => guardBodySize(tooLarge, 100));
});
test("email subject strips header line breaks", () => {
  assert.equal(safeEmailSubject("A\nB\rC"), "A B C");
  invalid(() => safeEmailSubject("Z".repeat(200)));
});
test("resume signatures reject extensions that disguise other file content", () => {
  const pdf = new Uint8Array([0x25,0x50,0x44,0x46,0x2d,0x31]);
  assert.equal(verifiedResumeMime("candidate.pdf", pdf), "application/pdf");
  invalid(() => verifiedResumeMime("candidate.pdf", new TextEncoder().encode("<script>alert(1)</script>")));
  invalid(() => verifiedResumeMime("../candidate.pdf", pdf));
  invalid(() => verifiedResumeMime("candidate.exe", pdf));
  invalid(() => verifiedResumeMime("candidate.docx", pdf));
});
test("accepts ZIP header only as format identification, not a malware verdict", () => {
  const zip = new Uint8Array([0x50,0x4b,0x03,0x04,0,0]);
  assert.equal(verifiedResumeMime("candidate.docx", zip), "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
});
