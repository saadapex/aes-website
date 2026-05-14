import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Purchase Order Terms & Conditions",
  description: "Standard Purchase Order Terms & Conditions for Apex Enterprise Solutions subcontract engagements.",
};

export default function POTermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        h1="Purchase Order Terms &amp; Conditions"
        sub="Standard terms governing all AES purchase orders issued to subcontractors and vendors."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "PO Terms", href: "/po-terms" }]}
      />
      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10 text-[#1F2933] text-sm leading-relaxed">

            <div className="bg-[#F4F7FA] border-l-4 border-[#006FB9] rounded-r-lg p-5">
              <p className="text-[#06284C] font-semibold">These Purchase Order Terms &amp; Conditions (&quot;PO Terms&quot;) apply to all purchase orders issued by Apex Enterprise Solutions (&quot;AES,&quot; &quot;Buyer&quot;) to vendors, subcontractors, and suppliers (&quot;Seller&quot;). By accepting a purchase order, Seller agrees to be bound by these terms.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">1. Acceptance</h2>
              <p>A purchase order becomes a binding contract upon Seller&apos;s written acceptance, commencement of work, or delivery of goods or services — whichever occurs first. Any terms in Seller&apos;s acknowledgment or invoice that conflict with or add to these PO Terms are hereby rejected unless expressly agreed in writing by an authorized AES representative.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">2. Scope of Work</h2>
              <p>Seller shall perform the services or deliver the goods described in the purchase order in accordance with the specifications, drawings, and standards referenced therein. Any changes to scope must be authorized in writing by AES before work proceeds.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">3. Pricing &amp; Payment</h2>
              <p>Prices are fixed as stated in the purchase order. AES will pay undisputed invoices within <strong>net 30 days</strong> of receipt of a correct invoice and completion of deliverables, unless otherwise specified in the PO. Seller must submit invoices referencing the PO number. AES may withhold payment on disputed amounts pending resolution.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">4. Delivery &amp; Schedule</h2>
              <p>Time is of the essence. Seller shall deliver goods or complete services by the date(s) specified in the PO. Seller must notify AES immediately if delivery or completion will be delayed. AES reserves the right to cancel the PO and source elsewhere if delays are unacceptable.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">5. Quality &amp; Workmanship</h2>
              <p>All goods and services must conform to applicable industry standards (ANSI/TIA, BICSI, NEC, OSHA) and any specifications stated in the PO. Seller is responsible for the quality and safety of its work. Defective work or materials must be corrected or replaced at Seller&apos;s expense.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">6. Insurance</h2>
              <p>Seller shall maintain, at its own expense, throughout the term of the PO:</p>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>Commercial General Liability: $1,000,000 per occurrence / $2,000,000 aggregate</li>
                <li>Workers&apos; Compensation: as required by applicable law</li>
                <li>Automobile Liability: $1,000,000 combined single limit (if vehicles used)</li>
              </ul>
              <p className="mt-3">Seller shall name Apex Enterprise Solutions as an additional insured on GL and Auto policies and provide certificates of insurance upon request.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">7. Safety &amp; Compliance</h2>
              <p>Seller shall comply with all applicable federal, state, and local laws, regulations, and ordinances, including OSHA standards. Seller is solely responsible for the safety of its personnel and for maintaining a safe work environment.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">8. Confidentiality</h2>
              <p>Seller shall treat all information received from AES in connection with a PO as confidential and shall not disclose it to third parties without AES&apos;s prior written consent. This obligation survives termination of the PO.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">9. Intellectual Property</h2>
              <p>All work product, deliverables, and documentation created by Seller in the performance of a PO are &quot;work made for hire&quot; and shall be the sole property of AES. Seller assigns all rights, title, and interest in such work product to AES.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">10. Indemnification</h2>
              <p>Seller shall indemnify, defend, and hold harmless AES and its officers, employees, and agents from any claims, damages, losses, or expenses (including attorneys&apos; fees) arising out of or related to Seller&apos;s performance under the PO, including but not limited to bodily injury, property damage, or Seller&apos;s failure to comply with applicable laws.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">11. Termination</h2>
              <p>AES may terminate a PO for convenience upon written notice. In such event, AES will pay Seller for work acceptably completed prior to termination. AES may also terminate immediately for cause (including material breach, insolvency, or safety violations) without liability beyond payment for conforming work completed.</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-xl font-bold mb-3">12. Governing Law</h2>
              <p>These PO Terms are governed by the laws of the State of California. Disputes shall be resolved in the courts of Santa Clara County, California.</p>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <p className="text-gray-500 text-xs">Questions? Contact <a href="mailto:info@apexsolutions.io" className="text-[#006FB9] hover:text-[#FF6B00] underline">info@apexsolutions.io</a>. Last revised: May 2026.</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
