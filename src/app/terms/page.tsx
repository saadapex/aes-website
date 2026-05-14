import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Apex Enterprise Solutions — governing use of the apexsolutions.io website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        h1="Terms of Service"
        sub="Last updated: May 2026"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Service", href: "/terms" }]}
      />
      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10 text-[#1F2933] text-sm leading-relaxed">

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using the website at <strong>apexsolutions.io</strong> (the &quot;Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site. These Terms apply to all visitors, users, and others who access or use the Site.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">2. About Apex Enterprise Solutions</h2>
              <p>Apex Enterprise Solutions (&quot;AES,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is an IT infrastructure deployment company headquartered in Sunnyvale, California, providing structured cabling, rack-and-stack, and wireless AP refresh services across the United States and Canada. The Site is an informational and lead-generation resource — it is not a marketplace or e-commerce platform.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">3. Use of the Site</h2>
              <p>You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others. You must not: transmit unsolicited promotional material; attempt unauthorized access to any part of the Site or its systems; use automated tools to harvest data without prior written consent; or reproduce or resell any part of the Site in contravention of these Terms.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">4. Intellectual Property</h2>
              <p>All content on the Site — including text, graphics, logos, images, and software — is the property of Apex Enterprise Solutions or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">5. Submitted Information</h2>
              <p>When you submit a contact form, partner inquiry, or newsletter signup, you represent that the information you provide is accurate. We handle your information in accordance with our <a href="/privacy" className="text-[#006FB9] hover:text-[#FF6B00] underline">Privacy Policy</a>. Submitting a form does not create a contractual obligation on either party — any engagement requires a separately executed agreement.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">6. Disclaimer of Warranties</h2>
              <p>The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. To the fullest extent permitted by law, AES disclaims all warranties, express or implied, including implied warranties of merchantability and fitness for a particular purpose.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by applicable law, Apex Enterprise Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site — even if we have been advised of the possibility of such damages.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">8. Third-Party Links</h2>
              <p>The Site may contain links to third-party websites provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or any loss arising from your use of them.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">9. Governing Law</h2>
              <p>These Terms are governed by the laws of the State of California, United States. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Santa Clara County, California.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">10. Changes to These Terms</h2>
              <p>We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the Site after changes constitutes your acceptance of the new Terms.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">11. Contact</h2>
              <p>Questions about these Terms? Reach us at <a href="mailto:info@apexsolutions.io" className="text-[#006FB9] hover:text-[#FF6B00] underline">info@apexsolutions.io</a> or by mail: Apex Enterprise Solutions, 1069 Duane Ct, Sunnyvale, CA 94085.</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
