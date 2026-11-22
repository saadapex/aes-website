import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import CaseStudyCard from "@/components/case-study-card";
import { CASE_STUDIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Data Center Structured Cabling & Fiber Acceptance",
  description: "Copper and fiber data center cabling, OTDR/OLTS acceptance planning, labeling, installation and project-specific closeout for primes and integrators.",
  alternates: { canonical: "https://www.apexsolutions.io/services/structured-cabling" },
};

const scope = [
  "Site survey and pathway design; permitting support",
  "CAT6/6A copper runs and terminations",
  "Single-mode and multi-mode fiber pulls, field-terminated and fusion-spliced where required",
  "Contract-specified testing: OTDR, OLTS/power meter, polarity, continuity or copper certification as required by the approved acceptance plan",
  "Rack dressing and documentation; freezer/cooler and high-bay experience",
  "Link IDs, test results, as-builts, punch closure and turnover records aligned to the contracted scope",
];
const kpis = [
  "Acceptance criteria and required test methods confirmed before field testing",
  "ANSI/TIA-606 (or owner-approved) labeling on cables, panels, and outlets",
  "Installs dressed, documented, and site-cleaned before we leave",
  "Contract-required closeout records and punch items reconciled at handover",
];
const deliverables = ["Test Reports", "Label Schema", "As-Builts", "Closeout Pack"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Structured Cabling",
  "description": "Data center and telecom structured cabling, copper and fiber installation, testing and closeout per approved scope for primes and systems integrators.",
  "provider": { "@id": "https://www.apexsolutions.io/#organization" },
  "areaServed": ["United States", "Canada"],
  "url": "https://www.apexsolutions.io/services/structured-cabling",
};

const faq = [
  {
    q: "Do you work as a subcontractor for IT integrators and general contractors?",
    a: "Yes — the majority of AES engagements are as a subcontract execution partner to prime contractors, systems integrators, and managed service providers. We bring our own supervision, documentation standards, and closeout deliverables to every engagement.",
  },
  {
    q: "What testing records and closeout evidence can be specified?",
    a: "The acceptance plan identifies required instruments, limits, test methods, and deliverables before work starts. Depending on approved scope, records may include OTDR trace files, OLTS or power meter results, polarity verification, copper certification from a suitable field tester, ANSI/TIA-606 or owner-approved labeling logs, as-builts and punch-list closure. Actual results and customer sign-off are project-specific.",
  },
  {
    q: "What cable categories and fiber types does AES install?",
    a: "We install CAT6, CAT6A (U/UTP and F/UTP shielded), and OS2, OM3, and OM4 fiber. Fiber runs are field-terminated or fusion-spliced depending on the design requirement. We also work in freezer, cooler, and high-bay environments.",
  },
  {
    q: "How long does a structured cabling project typically take?",
    a: "Timelines depend on pathway readiness, cable counts and lengths, active-facility access, approved testing methods, and coordination with other trades. AES develops a milestone and crew plan from the site survey and confirmed project scope rather than promising a generic installation duration.",
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
        sub="Copper and fiber installation for data centers, telecom rooms and enterprise sites — with defined acceptance criteria, test evidence and documented turnover to the approved scope."
        cta={{ label: "Request a Site Walk →", href: "/contact" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Structured Cabling", href: "/services/structured-cabling" },
        ]}
      />

      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image src="/images/service-structured-cabling.jpg" alt="Structured cabling installation in a data center" fill className="object-cover" priority />
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


      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mb-9">
            <p className="text-[#006FB9] text-xs font-semibold uppercase tracking-widest mb-2">
              Data center fiber acceptance
            </p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-4">
              What an acceptance-ready cabling package should prove
            </h2>
            <p className="text-[#1F2933] leading-relaxed">
              An OTDR screenshot alone is not a handover. The prime and owner need a traceable
              connection between the approved cable schedule, the installed link, its acceptance
              criteria, the recorded measurement and any dispositioned punch item.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Scope and test plan",
                detail: "Approved cable schedule, fiber type, end points, test wavelengths, loss budget and witness points.",
              },
              {
                name: "Installation traceability",
                detail: "Cable and port IDs, route drawings, polarity, label scheme and photos where permitted.",
              },
              {
                name: "Instrument evidence",
                detail: "Specified copper results, OLTS and/or OTDR trace files with pass/fail criteria and retest records.",
              },
              {
                name: "Handover control",
                detail: "As-built changes, exceptions, signed punch disposition and customer acceptance as required.",
              },
            ].map((item) => (
              <div key={item.name} className="rounded-xl bg-white border border-gray-100 p-6">
                <h3 className="text-[#06284C] font-bold text-lg mb-3">{item.name}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-[#4E6575] text-sm mt-6 max-w-4xl">
            Acceptance testing and record formats are defined by the executed scope and client
            requirements. AES&apos;s Quality Control Program establishes a process; no public
            sample report is represented as an independently audited project result.
          </p>
          <div className="flex flex-wrap gap-6 mt-7">
            <Link href="/resources/field-execution-evidence"
              className="text-[#006FB9] text-sm font-semibold hover:text-[#FF6B00]">
              Review AES project evidence and QC approach &rarr;
            </Link>
            <Link href="/blog/otdr-certification-fiber-acceptance"
              className="text-[#006FB9] text-sm font-semibold hover:text-[#FF6B00]">
              Read the fiber acceptance field note &rarr;
            </Link>
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
