import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import CaseStudyCard from "@/components/case-study-card";
import { CASE_STUDIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Structured Cabling — Copper & Fiber Installation",
  description: "Copper and fiber structured cabling installation across the U.S. and Canada. OTDR testing, as-builts, and closeout documentation included on every project.",
  alternates: { canonical: "https://www.apexsolutions.io/services/structured-cabling" },
};

const scope = [
  "Site survey and pathway design; permitting support",
  "CAT6/6A copper runs and terminations",
  "Single-mode and multi-mode fiber pulls, field-terminated and fusion-spliced where required",
  "Fiber tested with OTDR and power meter per approved scope; copper certified with Fluke DSX or equivalent; labeling to owner-approved ANSI/TIA-606 schema",
  "Rack dressing and documentation; freezer/cooler and high-bay experience",
  "Test reports, label schema, as-builts, and closeout pack",
];
const kpis = [
  "Fiber runs tested with OTDR and power meter per approved scope; copper links certified with approved field tester",
  "ANSI/TIA-606 (or owner-approved) labeling on cables, panels, and outlets",
  "Installs dressed, documented, and site-cleaned before we leave",
  "Closeout pack delivered at handover — not chased after",
];
const deliverables = ["Test Reports", "Label Schema", "As-Builts", "Closeout Pack"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Structured Cabling",
  "description": "Copper and fiber structured cabling installation across the U.S. and Canada. OTDR testing, as-builts, and closeout documentation on every project.",
  "provider": { "@type": "LocalBusiness", "name": "Apex Enterprise Solutions", "url": "https://www.apexsolutions.io" },
  "areaServed": ["United States", "Canada"],
  "url": "https://www.apexsolutions.io/services/structured-cabling",
};

const faq = [
  {
    q: "Do you work as a subcontractor for IT integrators and general contractors?",
    a: "Yes — the majority of AES engagements are as a subcontract execution partner to prime contractors, systems integrators, and managed service providers. We bring our own supervision, documentation standards, and closeout deliverables to every engagement.",
  },
  {
    q: "What certifications and documentation do you deliver at project closeout?",
    a: "Per approved scope, AES delivers OTDR trace files and power meter results on fiber runs, link certification reports from a Fluke DSX or equivalent field tester on copper, labeling records aligned with the ANSI/TIA-606 (or owner-approved) schema, and full as-built documentation. The complete closeout pack is delivered at handover — not chased after.",
  },
  {
    q: "What cable categories and fiber types does AES install?",
    a: "We install CAT6, CAT6A (U/UTP and F/UTP shielded), and OS2, OM3, and OM4 fiber. Fiber runs are field-terminated or fusion-spliced depending on the design requirement. We also work in freezer, cooler, and high-bay environments.",
  },
  {
    q: "How long does a structured cabling project typically take?",
    a: "A typical network comms room with 100–200 runs can be completed in 2–5 days. Larger multi-floor or multi-site deployments are scoped individually with milestone timelines. We provide daily progress updates throughout.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function StructuredCablingPage() {
  const featuredStudy = CASE_STUDIES.find((c) => c.slug === "telecom-transport-lab");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="Service"
        h1="Structured Cabling — Copper &amp; Fiber"
        sub="CAT6/6A copper and fiber runs executed to spec — signal-certified, labeled, and fully documented at handover. From network comms rooms to hyperscale data halls."
        cta={{ label: "Request a Site Walk →", href: "/contact" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Structured Cabling", href: "/services/structured-cabling" },
        ]}
      />

      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image src="/images/service-structured-cabling.png" alt="Structured cabling installation in a data center" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/50 to-transparent" />
      </div>

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="order-first lg:order-last">
            <div className="bg-[#06284C] rounded-xl p-6 lg:sticky lg:top-28">
              <h3 className="text-[#4E6575] uppercase tracking-widest text-xs mb-5">Performance Targets</h3>
              {kpis.map((kpi) => (
                <div key={kpi} className="flex items-start gap-2 mb-4">
                  <span className="text-[#FF6B00] font-bold flex-shrink-0">&rsaquo;</span>
                  <span className="text-white text-sm">{kpi}</span>
                </div>
              ))}
              <Link href="/contact" className="btn-primary w-full justify-center mt-6 text-sm">
                Request a Site Walk &rarr;
              </Link>
            </div>
          </div>
          <div className="lg:col-span-2 lg:order-first">
            <h2 className="text-[#06284C] text-2xl font-bold mb-6">Scope of Work</h2>
            <ul className="space-y-3 mb-10">
              {scope.map((item) => (
                <li key={item} className="flex gap-3 text-[#1F2933]">
                  <span className="text-[#FF6B00] font-bold flex-shrink-0 mt-0.5">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="text-[#06284C] text-2xl font-bold mb-4">Deliverables</h2>
            <div className="flex flex-wrap gap-3">
              {deliverables.map((d) => (
                <span key={d} className="bg-[#F4F7FA] border border-[#006FB9]/20 text-[#06284C] px-4 py-2 rounded-full text-sm font-medium">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featuredStudy && (
        <section className="bg-[#F4F7FA] section-pad">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[#06284C] text-3xl font-bold mb-10">See It in the Field</h2>
            <div className="max-w-xl">
              <CaseStudyCard {...featuredStudy} />
            </div>
            <div className="mt-8">
              <Link href="/case-studies" className="text-[#006FB9] font-semibold text-sm hover:text-[#FF6B00] transition-colors">
                View All Deployments &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="bg-[#F4F6F9] section-pad">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#0D1F3C] text-3xl font-bold mb-10">Structured Cabling — FAQ</h2>
          <div className="max-w-3xl space-y-8">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-gray-200 pb-8 last:border-0">
                <h3 className="text-[#0D1F3C] text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-[#1F2933] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Cabling runs don't wait. Neither do we." />
    </>
  );
}
