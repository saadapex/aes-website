# AES public website: security release checklist

Status: **Draft security branch; do not assume deployed or production-safe.**
Scope: public `saadapex/aes-website` repo, NOT Control Tower.

## What this patch changes
- Adds server-side length/type checks for contact, partner, vendor, lead-magnet, newsletter and career endpoints.
- Encodes untrusted HTML in transactional emails.
- Adds non-disruptive hidden honeypot inputs to form pages.
- Checks upload signatures and rejects obvious disguised files (not a malware scan).
- Removes the contact form's misleading, nonfunctional document-upload control.
- Adds security-focused unit tests, TypeScript/build CI and a blocking npm production dependency audit.

## Release blockers / administrative tasks

1. **Do not merge** without PR tests and build results. The old Next.js 14 and Nodemailer 6 dependency families must be upgraded to supported, fully patched major versions and tested for Next/Sanity compatibility. Re-run `npm audit` and verify all production advisories.
2. **Deploy edge abuse controls**: Vercel Firewall/WAF rate limits or a similar distributed service; managed bot challenge, structured logs, burst and cost thresholds. The honeypot alone is not sufficient. Test false positives and allowlisted legitimate crawlers.
3. **Résumé malware scanning remains missing.** Do not treat file magic bytes as a malware scan. Change the career intake to quarantine uploads, scan with an approved private scanner, and only then release to staff. Assess document macros, ZIP bombs and file retention. Do not merge the careers-upload path as a completed risk mitigation.
4. **Harden CSP**: audit actual production script usage, remove `unsafe-eval`, replace `unsafe-inline` with hashes/nonces when feasible; verify live HSTS/CSP headers and third-party tracker consent.
5. **Review privacy/consent**: inventory Clarity, LinkedIn, GA and HubSpot use in production; correct privacy disclosures and any legally required choice/withdrawal handling.
6. **Protect deployment and identity**: require protected main, reviewed PRs, MFA/passkeys, least-privilege Vercel/GitHub/Google accounts; rotate/limit SMTP app-password use.
7. **Verification**: test real form submissions in a preview environment; verify HubSpot writes, email escaping, CAPTCHA/rate enforcement, upload malware quarantine, Vercel deployment logs and rollback.

Security QA does NOT certify legal compliance or establish an independent penetration test. No production secrets should be placed in this repository.
