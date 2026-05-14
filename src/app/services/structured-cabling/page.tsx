import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Structured Cabling — Copper & Fiber Installation",
  description: "Certified copper and fiber structured cabling installation across the U.S. and Canada. OTDR testing, as-builts, and closeout documentation included on every project.",
};

const scope = [
  "Site survey and pathway design; permitting support",
  "CAT6/6A copper runs and terminations",
  "SM/MM fiber pulls and LC/MPO terminations; fusion splicing",
  "OTDR and power meter certification; labeling to TIA/EIA-606",
  "Rack dressing and documentation; freezer/cooler and high-bay experience",
  "Certification reports, label schema, as-builts, and closeout pack",
];
const kpis = [
  "OTDR pass rate ≥ 99%",
  "TIA/EIA-606 labeling compliance",
  "Zero-incident field target",
  "Clean closeout documentation",
];
const deliverables = ["Certification Reports", "Label Schema", "As-Builts", "Closeout Pack"];


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Structured Cabling",
  "description": "Certified copper and fiber structured cabling installation across the U.S. and Canada. OTDR testing, as-builts, and closeout documentation on every project.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Apex Enterprise Solutions",
    "url": "https://www.apexsolutions.io"
  },
  "areaServed": ["United States", "Canada"],
  "url": "https://www.apexsolutions.io/services/structured-cabling"
};

export default function StructuredCablingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Service"
        h1="Structured Cabling — Copper &amp; Fiber"
        sub="Certified copper and fiber that pass the test the first time. From IDF/MDF rooms to hyperscale halls."
        cta={{ label: "Request a Site Walk →", href: "/contact" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Structured Cabling", href: "/services/structured-cabling" },
        ]}
      />

      {/* Service image banner */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/service-structured-cabling.png"
          alt="Structured cabling installation in a data center"
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
              <Link href="/contact" className="btn-primary w-full justify-center mt-6 text-sm">
                Request a Site Walk →
              </Link>
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
      <CtaBand heading="Need certified cabling for your next deployment?" />
    </>
  );
}
