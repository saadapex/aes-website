import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = { title: "AP Refresh — Large-Scale Wireless Rollouts" };

const scope = [
  "Pre-deployment site surveys and RF planning",
  "Access point physical installation — ceiling, wall, and high-bay mounting",
  "Low-voltage cabling and conduit runs to AP locations",
  "Controller and cloud-managed AP configuration and onboarding",
  "Post-install RF validation and coverage testing",
  "Labeling, documentation, and as-built drawings",
  "Freezer, cooler, and harsh-environment rated installations",
  "Multi-site program rollouts with standardized deployment playbooks",
];
const kpis = [
  "≥ 95% first-pass coverage target",
  "98% first-pass installation rate",
  "Zero unplanned downtime target",
  "Validated test pack at handover",
];
const deliverables = ["RF Survey Report", "Coverage Validation", "As-Builts", "Label Schema", "Closeout Pack"];

export default function ApRefreshPage() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        h1="AP Refresh — Large-Scale Wireless Rollouts"
        sub="High-density Wi-Fi that survives steel, concrete, and cold storage. Multi-site rollouts executed with a standardized deployment playbook."
        cta={{ label: "Get a Quote →", href: "/contact" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "AP Refresh", href: "/services/ap-refresh" },
        ]}
      />

      {/* Service image banner */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/service-ap-refresh.png"
          alt="Wireless access point installation in a large facility"
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
                Get a Quote →
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
      <CtaBand heading="Rolling out Wi-Fi across multiple sites?" />
    </>
  );
}
