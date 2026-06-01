import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, FileText } from "lucide-react";
import PageHero from "@/components/page-hero";
import FormErrorBanner from "@/components/form-error-banner";

export const metadata: Metadata = {
  title: "Structured Cabling RFP Template — Free Download",
  description:
    "Download the AES Structured Cabling & Fiber RFP Template — 22 pages with interactive form fields. Scope of work, technical specs, deliverables, schedule, pricing, qualifications, and evaluation criteria. Free to download for primes, integrators, and enterprise IT teams.",
  alternates: { canonical: "https://www.apexsolutions.io/resources/rfp-template" },
};

const WHATS_INSIDE = [
  "Scope of work template with editable line items",
  "Technical specifications for CAT6 / CAT6A copper and SM / MM fiber",
  "Deliverables and closeout pack requirements (OTDR, power meter, label schema, as-builts)",
  "Sample schedule milestones and acceptance criteria",
  "Pricing structure template with labor / materials / contingency breakdowns",
  "Qualifications and references section",
  "Evaluation criteria and scoring rubric",
  "Interactive PDF form fields — drop in your project details and send",
];

const WHO_USES_IT = [
  "Prime contractors scoping low-voltage subcontract work",
  "Systems integrators building procurement packages",
  "Enterprise IT directors comparing vendor bids fairly",
  "Facilities and operations teams writing their first cabling RFP",
];

export default function RfpTemplateLeadMagnetPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Download · Lead Magnet"
        h1="Structured Cabling RFP Template"
        sub="A 22-page editable RFP template covering scope, specs, deliverables, schedule, pricing, qualifications, and evaluation criteria. Built to procurement standards — drop in your project details and send it out."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "RFP Template", href: "/resources/rfp-template" },
        ]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: preview + what's inside (3 cols) */}
          <div className="lg:col-span-3 space-y-10">

            <div className="relative w-full aspect-[3/4] max-w-md rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src="/images/case-telecom-lab.jpg"
                alt="AES Structured Cabling RFP Template — cover preview"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/85 via-[#06284C]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-xs uppercase tracking-wide font-bold px-3 py-1 rounded mb-3">
                  <FileText size={12} /> 22 Pages · Interactive PDF
                </div>
                <h3 className="text-white text-2xl font-black leading-tight">AES Structured Cabling &amp; Fiber RFP Template</h3>
                <p className="text-sm text-gray-200 mt-1">v2.2 · For primes, integrators &amp; enterprise IT</p>
              </div>
            </div>

            <div>
              <h2 className="text-[#06284C] text-2xl font-bold mb-6">Eight Sections, One Editable PDF</h2>
              <ul className="space-y-3">
                {WHATS_INSIDE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#1F2933]">
                    <Check size={18} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[#06284C] text-2xl font-bold mb-6">Built for the People Writing the RFP</h2>
              <ul className="space-y-3">
                {WHO_USES_IT.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#1F2933]">
                    <span className="text-[#FF6B00] font-bold flex-shrink-0 mt-0.5">&rsaquo;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F4F7FA] rounded-xl p-6 border-l-4 border-[#006FB9]">
              <h3 className="text-[#06284C] font-bold mb-2">Why we publish this</h3>
              <p className="text-[#1F2933] text-sm leading-relaxed">
                Most teams writing a cabling RFP are doing it for the first or second time in their career — which means scope gaps, mismatched evaluation criteria, and bids that aren&apos;t comparable. A well-built template makes the comparison fair. That&apos;s good for buyers, and it&apos;s good for AES because we win on execution and documentation, not on procurement confusion. Use it as a starting point. Edit it. Strip the AES branding if you need to.
              </p>
            </div>
          </div>

          {/* Right: gated form (2 cols, sticky) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 bg-[#06284C] rounded-xl p-8 shadow-xl">
              <h2 className="text-white text-2xl font-bold mb-2">Get the Template</h2>
              <p className="text-[#7A9FC0] text-sm mb-6">
                Enter your details and we&apos;ll send you straight to the download. No spam, no follow-up sales calls unless you ask for one.
              </p>

              <Suspense fallback={null}>
                <FormErrorBanner message="Something went wrong — please try again or email info@apexsolutions.io and we'll send the PDF directly." />
              </Suspense>

              <form action="/api/lead-magnet" method="POST" className="space-y-4">
                <input type="hidden" name="resource" value="rfp-template" />

                <div>
                  <label className="block text-xs font-semibold text-[#7A9FC0] uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#4E6575] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7A9FC0] uppercase tracking-wide mb-1.5">Work Email *</label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#4E6575] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7A9FC0] uppercase tracking-wide mb-1.5">Company</label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#4E6575] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7A9FC0] uppercase tracking-wide mb-1.5">Role / Title</label>
                  <input
                    name="role"
                    type="text"
                    placeholder="e.g. Director of IT, Program Manager"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#4E6575] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-base shadow-lg"
                >
                  Send Me the Template &rarr;
                </button>

                <p className="text-xs text-[#4E6575] text-center leading-relaxed pt-2">
                  By submitting, you agree to receive the template via download and may occasionally hear from AES.
                  We never sell or share your information. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[#06284C] text-2xl font-bold mb-4">Skip the Template — Send Us Your RFP</h2>
          <p className="text-[#1F2933] max-w-2xl mx-auto leading-relaxed mb-6">
            If your scope is already written, we&apos;ll review it directly. One business day, real person, straight answer on how AES can execute.
          </p>
          <Link href="/contact" className="btn-primary">Send Your Scope →</Link>
        </div>
      </section>
    </>
  );
}
