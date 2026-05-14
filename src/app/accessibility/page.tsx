import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Apex Enterprise Solutions is committed to making apexsolutions.io accessible to all users.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        h1="Accessibility Statement"
        sub="Last updated: May 2026"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Accessibility", href: "/accessibility" }]}
      />
      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10 text-[#1F2933] text-sm leading-relaxed">

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">Our Commitment</h2>
              <p>Apex Enterprise Solutions is committed to ensuring that <strong>apexsolutions.io</strong> is accessible to people with disabilities. We are actively working to increase the accessibility and usability of our website and to conform to applicable accessibility standards.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">Standards We Target</h2>
              <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with disabilities. Conformance to these guidelines also generally makes web content more usable to all users.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">What We&apos;re Doing</h2>
              <p>Our ongoing efforts include:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li>Using semantic HTML to support screen readers and assistive technologies.</li>
                <li>Ensuring sufficient color contrast ratios across text and interactive elements.</li>
                <li>Providing descriptive alt text for all meaningful images.</li>
                <li>Making all functionality available via keyboard navigation.</li>
                <li>Using ARIA labels on interactive components where native HTML semantics are insufficient.</li>
                <li>Testing with modern assistive technologies during development.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">Known Limitations</h2>
              <p>While we strive for full accessibility, some third-party content or embedded tools on the site may not fully conform to WCAG 2.1 AA. We are working with vendors to address these gaps and will update this statement as improvements are made.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">Feedback &amp; Contact</h2>
              <p>We welcome your feedback on the accessibility of this website. If you experience any barriers or have suggestions for improvement, please contact us:</p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                <li><strong>Email:</strong> <a href="mailto:info@apexsolutions.io" className="text-[#006FB9] hover:text-[#FF6B00] underline">info@apexsolutions.io</a></li>
                <li><strong>Phone:</strong> <a href="tel:16692517810" className="text-[#006FB9] hover:text-[#FF6B00] underline">(669) 251-7810</a></li>
                <li><strong>Mail:</strong> Apex Enterprise Solutions, 1069 Duane Ct, Sunnyvale, CA 94085</li>
              </ul>
              <p className="mt-4">We aim to respond to accessibility feedback within 3 business days.</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
