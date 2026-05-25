// v2
import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/page-hero";
import FormErrorBanner from "@/components/form-error-banner";
import CtaBand from "@/components/cta-band";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Partner With AES — Apex Enterprise Solutions",
  description: "Become an AES execution partner. We support primes, integrators, and MSPs with reliable field teams, clean documentation, and competitive subcontract rates across North America.",
  alternates: { canonical: "https://www.apexsolutions.io/partners" },
};

const CURRENT_PARTNERS = [
  {
    name: "HPE",
    logo: "/images/Partners%20Logo/HPE-Logo.png",
    href: "https://www.hpe.com/us/en/home.html",
    body: "Global technology leader providing servers, storage, networking, and edge infrastructure for enterprise and data center environments.",
  },
  {
    name: "Black Box",
    logo: "/images/Partners%20Logo/Blackbox-Logo.jpg",
    href: "https://www.blackbox.com/",
    body: "IT infrastructure solutions provider specializing in network infrastructure, KVM, and professional services across North America.",
  },
  {
    name: "DataKnox",
    logo: "/images/Partners%20Logo/636bbbf913f59171dda12e5b_dataknox-blue.svg",
    href: "https://www.dataknox.io/",
    body: "Data center solutions provider offering colocation, managed services, and infrastructure deployment across the U.S.",
  },
  {
    name: "High Plains Computing",
    logo: "/images/Partners%20Logo/hpc-highplains-logo.png.webp",
    href: "https://www.linkedin.com/company/highplains/about/",
    body: "Regional IT infrastructure and computing solutions partner with deep expertise in enterprise hardware deployment.",
  },
  {
    name: "NETS International",
    logo: "/images/Partners%20Logo/nets-logo-1024x728.png",
    href: "https://nets-international.com/",
    body: "Network and infrastructure services company delivering structured cabling, fiber, and low-voltage solutions globally.",
  },
  {
    name: "Eaton / Exertherm",
    logo: "/images/Partners%20Logo/Exertherm%20logo.svg",
    href: "https://www.eaton.com/us/en-us/catalog/asset-maintenance-solutions/continuous-thermal-monitoring-solutions.html",
    body: "Continuous thermal monitoring solutions for electrical systems — keeping mission-critical infrastructure safe and compliant.",
  },
  {
    name: "Wraab",
    logo: "/images/Partners%20Logo/wraab.png",
    href: "https://wraab.com/",
    body: "Technology services partner supporting IT infrastructure projects with field execution and logistics coordination.",
  },
  {
    name: "Karavan Technology",
    logo: "/images/Partners%20Logo/Karavan.svg",
    href: "https://gokaravan.com/",
    body: "IT project management and deployment partner with deep expertise in coordinating large-scale infrastructure rollouts across North America.",
  },
  {
    name: "Inventiv Technology",
    logo: "/images/Partners%20Logo/INVENTIV-TECHNOLOGY-TRANSPARENT-PNG.png.webp",
    href: "https://inventivtechnology.com/",
    body: "Full-service IT solutions provider delivering managed services, infrastructure design, and field deployment support.",
  },
];

const BENEFITS = [
  { title: "Reliable Field Execution", body: "We show up, stay on schedule, and deliver clean work. Your reputation is protected on every engagement we support." },
  { title: "Transparent Communication", body: "Daily updates, early issue escalation, and responsive coordination — no surprises from kickoff to handover." },
  { title: "Scalable Capacity", body: "Need two techs or twenty? We flex to your program size across the U.S. and Canada without compromising quality." },
  { title: "Clean Closeout Documentation", body: "Every project ends with as-builts, test reports, and label schemas that hold up to client scrutiny." },
  { title: "Competitive Subcontract Pricing", body: "Lean overhead means competitive rates. We price to win work together, not to pad margin at your expense." },
  { title: "North America Coverage", body: "Active field pods in California, Texas, Nevada, Tennessee, and Canada. We mobilize where the work is." },
];

const WHO = [
  "General Contractors & Prime Contractors",
  "Systems Integrators",
  "Managed Service Providers (MSPs)",
  "Telecom & Network Service Providers",
  "IT Staffing & Field Services Companies",
  "Data Center Operators & Developers",
];

const STEPS = [
  { num: "01", title: "Submit Inquiry", body: "Fill out the partner form below. We'll review your scope and service area within one business day." },
  { num: "02", title: "Intro Call", body: "A quick call with Saad to align on services, coverage, subcontract terms, and pricing expectations." },
  { num: "03", title: "NDA & Agreement", body: "We execute an NDA and a master subcontract agreement — straightforward, no surprises." },
  { num: "04", title: "First Deployment", body: "You send us scope, we execute. Clean work, documented handover, and a partner you can count on." },
];

const WHEN_PARTNERS_CALL = [
  "You've won work outside your core geography and need credentialed crews on the ground",
  "Your internal field team is overloaded and a deadline isn't moving",
  "You need crews in California, Nevada, Texas, Tennessee, Ontario, or Alberta",
  "You need AP refresh support in live warehouse or fulfillment environments",
  "You need closeout documentation that protects your client relationship",
  "You need a subcontractor who will not poach your customer",
];

const WHAT_AES_WONT_DO = [
  { title: "We will not bypass your PM", body: "Your project manager owns the client relationship. AES communicates through your PM and follows your documentation and reporting standards." },
  { title: "We will not poach your client", body: "Direct-engagement requests from your client get routed back to you. We do not pursue work behind a partner's back, full stop." },
  { title: "We will not publish project details without permission", body: "Project names, client names, site addresses, and outcome data stay confidential unless you give written approval to disclose." },
  { title: "We will not send unvetted labor and hope it works out", body: "Every AES tech is credentialed, briefed on the site, and held to AES documentation standards. If we can't staff to the standard, we tell you before you commit." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner Program"
        h1="Become an AES Execution Partner"
        sub="Primes, integrators, and MSPs across North America bring AES in when field execution has to be right. Reliable crews, clean work, handover-ready documentation — every engagement."
        cta={{ label: "Submit Partner Inquiry →", href: "#partner-form" }}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Partners", href: "/partners" }]}
      />

      {/* Who we partner with */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow mb-3">Who We Work With</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-6">Built for Primes, Integrators &amp; MSPs</h2>
            <p className="text-[#1F2933] text-lg leading-relaxed mb-6">
              AES is a field execution partner — not a staffing agency, not a general contractor.
              We bring our own processes, our own techs, and our own quality standards to every
              engagement. When you hand off scope to AES, it gets done.
            </p>
            <ul className="space-y-3">
              {WHO.map((w) => (
                <li key={w} className="flex items-center gap-3 text-[#1F2933]">
                  <span className="w-2 h-2 bg-[#FF6B00] rounded-full flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-[#F4F7FA] rounded-lg p-5 border-l-4 border-[#006FB9]">
                <h3 className="text-[#06284C] font-bold mb-1">{b.title}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#06284C] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#4E6575] uppercase tracking-widest text-sm font-medium text-center mb-3">How It Works</p>
          <h2 className="text-white text-3xl font-bold mb-12 text-center">Simple Engagement Model</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-[#006FB9]/20 text-7xl font-black absolute -top-3 -left-1 select-none leading-none">{step.num}</div>
                <div className="relative pt-8 border-t-2 border-[#FF6B00]">
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-[#4E6575] text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current partners */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Delivery Network</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-3">Companies &amp; Ecosystems We Support</h2>
          <p className="text-[#4E6575] text-sm mb-10 max-w-2xl">AES has worked with or alongside the following companies on infrastructure projects. Relationships are project-based; logos are displayed for reference only.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRENT_PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F4F7FA] hover:bg-white border border-transparent hover:border-[#006FB9]/20 hover:shadow-md rounded-xl p-6 transition-all duration-200 flex flex-col gap-4"
              >
                {/* Logo or name badge */}
                <div className="h-14 flex items-center">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-12 max-w-[160px] w-auto h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <span className="text-[#06284C] font-bold text-lg group-hover:text-[#FF6B00] transition-colors">
                      {p.name}
                    </span>
                  )}
                </div>
                <div>
                  {p.logo && (
                    <p className="text-[#06284C] font-semibold text-sm mb-1 group-hover:text-[#FF6B00] transition-colors">
                      {p.name}
                    </p>
                  )}
                  <p className="text-[#1F2933] text-sm leading-relaxed">{p.body}</p>
                </div>
                <span className="text-xs text-[#006FB9] font-semibold group-hover:text-[#FF6B00] transition-colors mt-auto">
                  Visit Website →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* When Partners Call AES */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="eyebrow mb-3">When Partners Call AES</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-6">The Six Reasons Primes &amp; Integrators Reach Out</h2>
            <p className="text-[#1F2933] leading-relaxed mb-6">
              Our best partner conversations start one of these six ways. If any of them sound like your week, AES is built for exactly this.
            </p>
            <ul className="space-y-3">
              {WHEN_PARTNERS_CALL.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[#1F2933]">
                  <span className="text-[#FF6B00] font-bold flex-shrink-0 mt-0.5">&rsaquo;</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">What AES Will Not Do</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-6">Four Partner Commitments</h2>
            <p className="text-[#1F2933] leading-relaxed mb-6">
              The reason primes and integrators trust AES with their client engagements is that we&apos;re explicit about the lines we don&apos;t cross.
            </p>
            <div className="space-y-4">
              {WHAT_AES_WONT_DO.map((c) => (
                <div key={c.title} className="bg-white rounded-lg p-5 border-l-4 border-[#FF6B00]">
                  <h3 className="text-[#06284C] font-bold mb-1">{c.title}</h3>
                  <p className="text-[#1F2933] text-sm leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner inquiry form */}
      <section id="partner-form" className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <p className="eyebrow mb-3">Partner Inquiry</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-6">Let&apos;s Start the Conversation</h2>
            <Suspense fallback={null}>
              <FormErrorBanner message="Something went wrong — please try again or contact us directly." />
            </Suspense>
            <form action="/api/partner" method="POST" className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Full Name *</label>
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
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Company *</label>
                  <input name="company" required type="text" placeholder="Acme Integration Group"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Phone</label>
                  <input name="phone" type="tel" placeholder="(555) 000-0000"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Company Type *</label>
                <select name="type" required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9] bg-white">
                  <option value="">Select your company type</option>
                  <option>General / Prime Contractor</option>
                  <option>Systems Integrator</option>
                  <option>Managed Service Provider</option>
                  <option>Telecom / Network Service Provider</option>
                  <option>IT Staffing / Field Services</option>
                  <option>Data Center Operator</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-3">Services You Need Field Support For</label>
                <div className="flex flex-wrap gap-3">
                  {["Structured Cabling", "Rack & Stack", "AP Refresh", "Smart Hands", "Decommissioning"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="services" value={s} className="w-4 h-4 accent-[#FF6B00]" />
                      <span className="text-sm text-gray-700">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Geographic Coverage Needed</label>
                <input name="coverage" type="text" placeholder="e.g. U.S. West Coast, Texas, Canada"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Tell Us About Your Field Execution Needs</label>
                <textarea name="message" rows={4} placeholder="Volume, frequency, project types, any specific requirements..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9] resize-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="nda" className="w-4 h-4 accent-[#FF6B00]" />
                <span className="text-sm text-gray-600">NDA Required before discussion</span>
              </label>
              <button type="submit" className="btn-primary w-full justify-center text-base">
                Submit Partner Inquiry →
              </button>
              <p className="text-xs text-gray-400 text-center">We respond within one business day.</p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#06284C] rounded-xl p-8">
              <h3 className="text-white font-bold text-xl mb-4">Prefer a Direct Conversation?</h3>
              <p className="text-[#4E6575] text-sm mb-6 leading-relaxed">
                Book a call directly with Saad to discuss your subcontract needs, service area, and how AES can support your pipeline.
              </p>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                Book a Call with Saad →
              </a>
            </div>
            <div className="bg-[#F4F7FA] rounded-xl p-8 border border-[#006FB9]/10">
              <h3 className="text-[#06284C] font-bold text-lg mb-4">What to Expect</h3>
              <ul className="space-y-3">
                {[
                  "Response within 1 business day",
                  "No long-term commitment required upfront",
                  "Flexible NDA options available",
                  "Per-project or program-level engagements",
                  "Transparent, competitive subcontract rates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#1F2933]">
                    <span className="text-[#FF6B00] font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand heading="Already know what you need? Let's get it scoped." />
    </>
  );
}
