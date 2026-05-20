// v2
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import CaseStudyCard from "@/components/case-study-card";
import { CASE_STUDIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rack & Stack — Data Center Build & Refresh",
  description: "From bare room to live racks — AES delivers rack-and-stack, power, and cabling for data center builds and hardware refresh projects across North America.",
  alternates: { canonical: "https://www.apexsolutions.io/services/rack-and-stack" },
};

const scope = [
  "Pre-build planning: rack layout, power mapping, cable management design",
  "Physical rack installation, anchoring, and leveling",
  "Server, switch, and appliance mounting per vendor and client standards",
  "Power distribution unit (PDU) install and circuit labeling",
  "Cable management: structured patch, power, fiber — labeled to TIA/EIA-606",
  "BIOS/firmware validation and burn-in support",
  "Asset tagging, CMDB (IT asset database) updates, and closeout documentation",
  "Smart hands for hardware refresh, swap, and decommission",
];
const kpis = [
  "Every rack validated and punch-listed before handover",
  "CMDB-ready asset inventory delivered at closeout",
  "Burn-in support executed on-site where required",
  "Daily progress reports — no chasing required",
];
const deliverables = ["Rack Diagrams", "Cable Labels", "Burn-In Reports", "Asset Inventory", "Closeout Pack"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Rack and Stack",
  "description": "From bare room to live racks — data center build and hardware refresh including rack installation, power, and cabling across North America.",
  "provider": { "@type": "LocalBusiness", "name": "Apex Enterprise Solutions", "url": "https://www.apexsolutions.io" },
  "areaServed": ["United States", "Canada"],
  "url": "https://www.apexsolutions.io/services/rack-and-stack",
};

const faq = [
  {
    q: "What does rack and stack include in a data center deployment?",
    a: "AES rack and stack services cover physical rack installation and anchoring, server and appliance mounting per vendor specs, PDU installation and circuit labeling, structured cabling and power dressing within the rack, asset tagging, and full closeout documentation. We work from your BOMs and rack elevation drawings.",
  },
  {
    q: "Do you provide burn-in and validation after rack and stack?",
    a: "Yes. AES can perform burn-in monitoring, BIOS/firmware validation, IPMI/BMC verification, and pre-handover punch-list clearance where required. Burn-in scope and duration are confirmed during project planning.",
  },
  {
    q: "Can AES handle multi-site rack and stack rollouts simultaneously?",
    a: "Yes. We staff and coordinate multi-site deployments across U.S. and Canadian markets simultaneously using a network of vetted field resources. Multi-site rollouts include unified documentation, standardized labeling, and a single closeout pack per site.",
  },
  {
    q: "What documentation is delivered at rack and stack handover?",
    a: "Handover documentation includes rack elevation as-builts, cable labeling logs, equipment serial number records, PDU load documentation, burn-in test reports, and a signed punch-list clearance. CMDB-ready asset inventory is also provided.",
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

export default function RackAndStackPage() {
  const featuredStudy = CASE_STUDIES.find((c) => c.slug === "telecom-transport-lab");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="Service"
        h1="Rack &amp; Stack — Data Center Build &amp; Refresh"
        sub="Bare room to live racks, executed clean. AES handles the full build — planning through validated handover — so your PM doesn't have to chase it."
        cta={{ label: "Book a Planning Call →", href: "https://calendly.com/apexenterprisesolutions", external: true }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Rack & Stack", href: "/services/rack-and-stack" },
        ]}
      />

      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image src="/images/service-rack-stack.png" alt="Rack and stack data center installation" fill className="object-cover" priority />
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
              <a href="https://calendly.com/apexenterprisesolutions" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center mt-6 text-sm">
                Book a Planning Call &rarr;
              </a>
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
            <p className="eyebrow mb-3">Proof of Work</p>
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
          <p className="eyebrow mb-3">Common Questions</p>
          <h2 className="text-[#0D1F3C] text-3xl font-bold mb-10">Rack &amp; Stack — FAQ</h2>
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

      <CtaBand heading="Got racks to build? We'll be on-site." />
    </>
  );
}
