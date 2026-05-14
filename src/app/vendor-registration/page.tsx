import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vendor & Subcontractor Registration",
  description: "Register as a vendor or subcontractor with Apex Enterprise Solutions. We work with field technicians and specialty trades across the U.S. and Canada.",
};

export default function VendorRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Work With AES"
        h1="Vendor &amp; Subcontractor Registration"
        sub="We&apos;re always looking for skilled field technicians and specialty trades across the U.S. and Canada."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Vendor Registration", href: "/vendor-registration" }]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">

          <div className="lg:col-span-3">
            <p className="eyebrow mb-3">Tell Us About Your Capabilities</p>
            <h2 className="text-[#06284C] text-2xl font-bold mb-6">Register Your Business</h2>
            <form action="/api/vendor" method="POST" className="space-y-5">

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Contact Name *</label>
                  <input name="name" required type="text" placeholder="Jane Smith"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Work Email *</label>
                  <input name="email" required type="email" placeholder="jane@company.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Company / DBA Name *</label>
                  <input name="company" required type="text" placeholder="Smith Field Services LLC"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Phone *</label>
                  <input name="phone" required type="tel" placeholder="(555) 000-0000"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Business Type *</label>
                <select name="businessType" required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9] bg-white">
                  <option value="">Select type</option>
                  <option>LLC / Corporation</option>
                  <option>Sole Proprietor</option>
                  <option>Independent Contractor (1099)</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-3">Trade Capabilities</label>
                <div className="flex flex-wrap gap-3">
                  {["Structured Cabling", "Fiber Optics / OTDR", "Rack & Stack", "AP / Wireless", "Smart Hands", "Decommissioning", "Low Voltage / Electrical", "Project Management"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="trades" value={s} className="w-4 h-4 accent-[#FF6B00]" />
                      <span className="text-sm text-gray-700">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Geographic Coverage *</label>
                <input name="coverage" required type="text" placeholder="e.g. Bay Area CA, Dallas TX, all of Canada"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Certifications &amp; Licenses</label>
                <input name="certs" type="text" placeholder="e.g. BICSI, Panduit, Cisco, OSHA 10/30"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Additional Notes</label>
                <textarea name="notes" rows={3} placeholder="Tell us about your team size, experience level, or any specific equipment/tools..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9] resize-none" />
              </div>

              <button type="submit" className="btn-primary w-full justify-center text-base">
                Submit Registration →
              </button>
              <p className="text-xs text-gray-400 text-center">We review all submissions and follow up within 3–5 business days.</p>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#06284C] rounded-xl p-8">
              <h3 className="text-white font-bold text-xl mb-4">Why Work With AES?</h3>
              <ul className="space-y-3">
                {[
                  "Consistent project pipeline across the U.S. and Canada",
                  "Fair pay, clear scope — no bait-and-switch",
                  "Responsive coordination from kickoff to closeout",
                  "Repeat engagements for reliable technicians",
                  "We treat subs as partners, not just resources",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-[#FF6B00] font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#F4F7FA] rounded-xl p-8 border border-[#006FB9]/10">
              <h3 className="text-[#06284C] font-bold text-lg mb-4">Prefer to Talk First?</h3>
              <p className="text-[#1F2933] text-sm mb-5 leading-relaxed">
                Book a quick call with Saad to discuss your capabilities and where you&apos;d be the best fit.
              </p>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm">
                Book a Call →
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
