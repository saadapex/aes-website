import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Rack & Stack — Data Center Build & Refresh",
  description: "From bare room to live racks — AES delivers rack-and-stack, power, and cabling for data center builds and hardware refresh projects across North America.",
};

const scope = [
  "Pre-build planning: rack layout, power mapping, cable management design",
  "Physical rack installation, anchoring, and leveling",
  "Server, switch, and appliance mounting per vendor and client standards",
  "Power distribution unit (PDU) install and circuit labeling",
  "Cable management: structured patch, power, fiber — labeled to TIA/EIA-606",
  "BIOS/firmware validation and burn-in support",
  "Asset tagging, CMDB population, and closeout documentation",
  "Smart hands for hardware refresh, swap, and decommission",
];
const kpis = [
  "Zero-defect rack validation target",
  "CMDB-ready documentation at handover",
  "72-hour burn-in support available",
  "On-schedule delivery commitment",
];
const deliverables = ["Rack Diagrams", "Cable Labels", "Burn-In Reports", "Asset Inventory", "Closeout Pack"];


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Rack \& Stack",
  "description": "From bare room to live racks — data center build and hardware refresh including rack installation, power, and cabling across North America.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Apex Enterprise Solutions",
    "url": "https://www.apexsolutions.io"
  },
  "areaServed": ["United States", "Canada"],
  "url": "https://www.apexsolutions.io/services/rack-and-stack"
};

export default function RackAndStackPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Service"
        h1="Rack &amp; Stack — Data Center Build &amp; Refresh"
        sub="From bare room to live racks — fast. Disciplined execution from pre-build planning through validated handover."
        cta={{ label: "Book a Planning Call →", href: "https://calendly.com/apexenterprisesolutions", external: true }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Rack & Stack", href: "/services/rack-and-stack" },
        ]}
      />

      {/* Service image banner */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/service-rack-stack.png"
          alt="Rack and stack data center installation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/50 to-transparent" />
      </div>

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">

          {/* KPI sidebar — first on mobile, right column on desktop */}
          <div className="order-first lg:order-last">
            <div className="bg-[#06284C] rounded-xl p-6 lg:sticky lg:top-28">
              <h3 className="text-[#4E6575] uppercase tracking-widest text-xs mb-5">Performance Targets</h3>
              {kpis.map((kpi) => (
                <div key={kpi} className="flex items-start gap-2 mb-4">
                  <span className="text-[#FF6B00] font-bold flex-shrink-0">›</span>
                  <span className="text-white text-sm">{kpi}</span>
                </div>
              ))}
              <a href="https://calendly.com/apexenterprisesolutions" target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full justify-center mt-6 text-sm">
                Book a Planning Call →
              </a>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 lg:order-first">
            <h2 className="text-[#06284C] text-2xl font-bold mb-6">Scope of Work</h2>
            <ul className="space-y-3 mb-10">
              {scope.map((item) => (
                <li key={item} className="flex gap-3 text-[#1F2933]">
                  <span className="text-[#FF6B00] font-bold flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="text-[#06284C] text-2xl font-bold mb-4">Deliverables</h2>
            <div className="flex flex-wrap gap-3">
              {deliverables.map((d) => (
                <span key={d}
                  className="bg-[#F4F7FA] border border-[#006FB9]/20 text-[#06284C] px-4 py-2 rounded-full text-sm font-medium">
                  {d}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
      <CtaBand heading="Building or refreshing a data center?" />
    </>
  );
}
