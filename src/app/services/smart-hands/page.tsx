import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Smart Hands & Field Support — Remote Hands, Site Surveys, Decommissioning",
  description:
    "Vetted field hands for single-site fixes, audits, and rapid response across the U.S. and Canada — hardware swap, AP troubleshooting, IDF cleanup, asset validation, decommissioning, and remote hands.",
  alternates: { canonical: "https://www.apexsolutions.io/services/smart-hands" },
};

const scope = [
  "Hardware swap and break-fix (switches, APs, servers, PDUs, fiber modules)",
  "Site survey and pre-deployment walk-throughs",
  "Asset validation, audit, and tagging reconciliation against CMDB or inventory schema",
  "Decommissioning, packing, and chain-of-custody for retired equipment",
  "Remote hands — eyes, hands, and a phone on-site coordinating with your engineer",
  "Rack audit and IDF cleanup — labeling, cable remediation, photo documentation",
  "AP troubleshooting, controller verification, and coverage spot-checks",
  "Cross-connect work, patch and label cleanup, and small structured-cabling adds/moves/changes",
];

const kpis = [
  "On-site response coordinated within agreed SLA windows",
  "Credentialed, briefed crews — not pulled from a staffing list",
  "Photos, notes, and clean documentation delivered same-day",
  "Single point of accountability — your PM talks to one AES contact",
];

const deliverables = [
  "Site Photos & Notes",
  "Updated Asset Records",
  "Daily Field Report",
  "Decommissioning Chain-of-Custody",
];

const useCases = [
  {
    title: "When a single site goes sideways",
    body: "An AP isn't broadcasting, a switch needs replacing, a circuit needs a hands-on continuity check. AES rolls a credentialed tech — not a contractor pulled from a list.",
  },
  {
    title: "When your crew is overloaded",
    body: "Your team is committed to a multi-site rollout and can't break to handle a one-off scope. AES extends your bench without a full subcontract setup.",
  },
  {
    title: "When you need eyes before you mobilize",
    body: "Pre-deployment site surveys, validation walks, asset audits — AES gets you accurate field data before you commit a crew.",
  },
  {
    title: "When equipment is coming out, not going in",
    body: "Decommissioning, asset reconciliation, chain-of-custody packing, and disposal coordination. Documented and defensible.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Smart Hands and Field Support",
  description:
    "Smart hands, remote hands, site surveys, decommissioning, asset validation, AP troubleshooting, and IDF cleanup across the U.S. and Canada.",
  provider: { "@type": "LocalBusiness", name: "Apex Enterprise Solutions", url: "https://www.apexsolutions.io" },
  areaServed: ["United States", "Canada"],
  url: "https://www.apexsolutions.io/services/smart-hands",
};

const faq = [
  {
    q: "What's the difference between smart hands and remote hands at AES?",
    a: "We use the terms interchangeably to mean: AES has a credentialed technician on-site, executing tasks under direction of your network or systems engineer who is remote. The AES tech is your eyes, hands, and field judgment — your engineer drives the technical decisions.",
  },
  {
    q: "Will AES respond to a single-site emergency call?",
    a: "Yes, on a project-by-project basis. Response time depends on geography and crew availability — we'll be straight about what we can commit to. For repeat or rapid-response coverage, AES can stand up an agreement that pre-positions response expectations.",
  },
  {
    q: "Can AES handle decommissioning and equipment removal?",
    a: "Yes. Scope can include power-down, de-cabling, asset reconciliation against your inventory schema, chain-of-custody packing, and coordination with your e-waste or resale vendor. We document every step with photos and serial-level records.",
  },
  {
    q: "Do you work directly with my client, or under my brand?",
    a: "Whichever you prefer. AES regularly works as a subcontract execution partner under a prime, integrator, or MSP — we do not bypass your PM, do not poach your client, and do not publish project details without your written approval.",
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

export default function SmartHandsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="Service"
        h1="Smart Hands &amp; Field Support"
        sub="Vetted hands on the ground when you need a single-site fix, an audit, or rapid response — across the U.S. and Canada. AES extends your bench without spinning up a full subcontract."
        cta={{ label: "Request a Site Walk →", href: "/contact" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Smart Hands & Field Support", href: "/services/smart-hands" },
        ]}
      />

      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image src="/images/service-smart-hands.png" alt="AES field technician performing smart hands work in a data center" fill className="object-cover" priority />
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

      {/* When to call AES */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#06284C] text-3xl font-bold mb-10">Four Common Field-Support Scenarios</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div key={u.title} className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm">
                <h3 className="text-[#06284C] font-bold text-lg mb-3">{u.title}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#0D1F3C] text-3xl font-bold mb-10">Smart Hands &amp; Field Support — FAQ</h2>
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

      <CtaBand heading="Need hands on-site this week?" />
    </>
  );
}
