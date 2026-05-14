import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = { title: "Privacy Policy — Apex Enterprise Solutions" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        h1="Privacy Policy"
        sub="Last updated: May 2026"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy", href: "/privacy" }]}
      />
      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h2>1. Who We Are</h2>
          <p>Apex Enterprise Solutions ("AES", "we", "us") is an IT infrastructure deployment company headquartered in Sunnyvale, CA. Our website is <strong>apexsolutions.io</strong>.</p>

          <h2>2. Data We Collect</h2>
          <p>We collect information you provide directly — including name, email, company, phone number, and project details — when you submit a contact, partner, or newsletter form on this site.</p>
          <p>We also collect analytics data automatically via Google Analytics 4, including pages visited, session duration, and general location. This data is anonymized and does not identify you personally.</p>
          <p>We use HubSpot as our CRM to store and manage contact information submitted via forms.</p>

          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To respond to your enquiries and project requests</li>
            <li>To send you relevant updates and infrastructure insights (newsletter subscribers only)</li>
            <li>To improve our website and understand how visitors use it</li>
            <li>To manage our business relationships and pipeline</li>
          </ul>

          <h2>4. Cookies</h2>
          <p>We use the following categories of cookies:</p>
          <ul>
            <li><strong>Necessary:</strong> Essential for the site to function. No consent required.</li>
            <li><strong>Analytics:</strong> Google Analytics 4 — only set with your consent.</li>
            <li><strong>Marketing:</strong> HubSpot tracking — only set with your consent.</li>
          </ul>

          <h2>5. Legal Basis (GDPR)</h2>
          <ul>
            <li><strong>Consent</strong> — for cookies and newsletter subscriptions</li>
            <li><strong>Legitimate interests</strong> — for responding to business enquiries</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>Form submissions are retained in HubSpot for as long as necessary to manage the business relationship. You may request deletion at any time.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at <a href="mailto:info@apexsolutions.io">info@apexsolutions.io</a>. For GDPR requests, we respond within 30 days.</p>

          <h2>8. Third-Party Services</h2>
          <ul>
            <li><strong>Google Analytics 4</strong> — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><strong>HubSpot</strong> — <a href="https://legal.hubspot.com/privacy-policy" target="_blank" rel="noopener noreferrer">HubSpot Privacy Policy</a></li>
            <li><strong>Vercel</strong> — <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
          </ul>

          <h2>9. Contact</h2>
          <p>For privacy-related questions: <a href="mailto:info@apexsolutions.io">info@apexsolutions.io</a><br />
          Apex Enterprise Solutions, 1069 Duane Ct, Sunnyvale, CA 94085</p>
        </div>
      </section>
    </>
  );
}
