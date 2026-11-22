// v2
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import CaseStudyCard from "@/components/case-study-card";
import { CASE_STUDIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Multi-Site Warehouse AP Refresh & National Wi-Fi Rollouts",
  description: "Wireless AP refresh field execution for U.S. warehouses and multi-site rollouts: pre-staging, high-bay safety, AP tracking and agreed closeout; Canadian work through partners.",
  alternates: { canonical: "https://www.apexsolutions.io/services/ap-refresh" },
};

const scope = [
  "Pre-deployment site surveys and RF planning",
  "Access point physical installation — ceiling, wall, and high-bay mounting",
  "Low-voltage AP drops and approved pathways where included in scope and permitted",
  "Coordination with the client network engineer for configuration, controller adoption and cutover",
  "Client-specified per-AP connectivity checks and RF validation where included in scope",
  "Labeling, documentation, and as-built drawings",
  "Freezer, cooler, and harsh-environment rated installations",
  "Repeatable U.S. multi-site field plans, with Canadian execution coordinated through qualified delivery partners",
];
const kpis = [
  "RF survey or acceptance validation defined in the agreed scope, not assumed",
  "Per-device ID, mount location and progress captured to the project reporting format",
  "Scheduling coordinated around live operations to minimize disruption",
  "Required AP records, acceptance results, as-builts and punch closure reconciled",
];
const deliverables = ["AP Inventory", "Mount & Label Records", "Acceptance Checks", "As-Builts", "Closeout Pack"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AP Refresh",
  "description": "Multi-site warehouse wireless AP refresh field execution with pre-staging, mounting, asset tracking and contracted validation for prime contractors and systems integrators.",
  "provider": { "@id": "https://www.apexsolutions.io/#organization" },
  "areaServed": ["United States", "Canada"],
  "url": "https://www.apexsolutions.io/services/ap-refresh",
};

const faq = [
  {
    q: "How many access points can your team install per shift?",
    a: "Shift production depends on AP mounting height, lift availability, site access and change windows, cabling scope, pre-staging, and the required validation method. AES sizes crew and shift plans after reviewing the site list and drawings, rather than promising a universal AP-per-shift rate.",
  },
  {
    q: "What wireless platforms does AES support?",
    a: "AES deploys access points for Cisco (Catalyst and Meraki), Juniper Mist, Aruba/HPE, Extreme Networks, and Ubiquiti. Our crews handle physical mounting, low-voltage cabling, and basic configuration staging — RF planning and controller configuration are coordinated with the responsible network engineer.",
  },
  {
    q: "Do you provide post-installation testing and coverage validation?",
    a: "The project scope defines which device checks and RF deliverables are required. Typical evidence can include an AP-by-AP install and inventory log, port mapping, controller association confirmation from the client network team, and an RF walk-test or survey where specified. Full RF acceptance is not implied when only a physical swap or cable qualification is contracted.",
  },
  {
    q: "Can AES handle decommissioning of legacy APs as part of a refresh?",
    a: "Yes. AES can decommission and remove legacy equipment as part of a refresh scope. Disposal options include certified e-waste recycling or return to client inventory, per project requirements.",
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

export default function ApRefreshPage() {
  const featuredStudy = CASE_STUDIES.find((c) => c.slug === "fulfillment-ap-refresh-ontario");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="Service"
        h1="AP Refresh — Large-Scale Wireless Rollouts"
        sub="Subcontract field execution for U.S. warehouse wireless refreshes: safe high-bay access, site pre-staging, AP-by-AP tracking and closeout, coordinated with the client network engineering team."
        cta={{ label: "Request a Site Walk →", href: "/contact" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "AP Refresh", href: "/services/ap-refresh" },
        ]}
      />

      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image src="/images/service-ap-refresh.png" alt="Wireless access point installation in a large facility" fill className="object-cover" priority />
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
              Multi-site rollout execution
            </p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-4">
              One field playbook, site-specific controls
            </h2>
            <p className="text-[#1F2933] leading-relaxed">
              Primes and systems integrators need consistent field reporting across many locations,
              not just device counts. AES organizes the on-site work around change windows, access,
              lift plans, hardware tracking and the customer&apos;s acceptance criteria.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "01 | Survey and stage",
                body: "Confirm site contacts, approved AP placements, asset labels, lift and safety needs, inventory and shift windows.",
              },
              {
                title: "02 | Install and track",
                body: "Capture AP ID, port, serial/MAC and mounting location in the client-approved register as work progresses.",
              },
              {
                title: "03 | Coordinate cutover",
                body: "Separate physical swap, client network configuration, controller adoption and any contracted RF acceptance tasks.",
              },
              {
                title: "04 | Close each site",
                body: "Reconcile device counts, photos, exceptions, cable checks and as-builts before site-level handover.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className="text-[#06284C] font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-[#006FB9]/20 bg-white p-6 lg:p-8">
            <h3 className="text-[#06284C] text-xl font-bold mb-3">Published multi-site execution example</h3>
            <p className="text-[#1F2933] text-sm leading-relaxed mb-4">
              AES&apos;s own Ontario fulfillment case study reports <strong>1,586+ wireless AP
              replacements across two facilities and 46 IDFs</strong>, including a 24-hour site
              window. The published account details pre-labeling, scissor-lift safety, shift
              handoffs and device-level tracking. These are AES-published figures, not an
              independent customer attestation.
            </p>
            <p className="text-[#4E6575] text-sm mb-5">
              Present-day Canadian engagements are coordinated through delivery partners.
              U.S. coverage and crew availability are confirmed against each site list.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/case-studies/fulfillment-ap-refresh-ontario"
                className="text-[#006FB9] text-sm font-semibold hover:text-[#FF6B00]">
                Read the published Ontario case study &rarr;
              </Link>
              <Link href="/resources/field-execution-evidence"
                className="text-[#006FB9] text-sm font-semibold hover:text-[#FF6B00]">
                Review evidence and QC requirements &rarr;
              </Link>
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
          <h2 className="text-[#0D1F3C] text-3xl font-bold mb-10">AP Refresh — FAQ</h2>
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

      <CtaBand heading="Multi-site Wi-Fi rollout? We run those programs." />
    </>
  );
}
