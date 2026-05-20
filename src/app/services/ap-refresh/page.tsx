// v2
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import CaseStudyCard from "@/components/case-study-card";
import { CASE_STUDIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AP Refresh — Large-Scale Wireless Rollouts",
  description: "High-density Wi-Fi deployments for warehouses, logistics facilities, and enterprise campuses. AES installs and validates access points at scale across the U.S. and Canada.",
  alternates: { canonical: "https://www.apexsolutions.io/services/ap-refresh" },
};

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
  "Wireless coverage (RF) validated at every site — not assumed",
  "Per-AP progress tracked and reported in real time",
  "Scheduling coordinated around live operations — zero disruption",
  "Validated test pack and as-builts delivered at handover",
];
const deliverables = ["RF Survey Report", "Coverage Validation", "As-Builts", "Label Schema", "Closeout Pack"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AP Refresh",
  "description": "Large-scale wireless access point rollouts for warehouses, logistics facilities, and enterprise campuses across the U.S. and Canada.",
  "provider": { "@type": "LocalBusiness", "name": "Apex Enterprise Solutions", "url": "https://www.apexsolutions.io" },
  "areaServed": ["United States", "Canada"],
  "url": "https://www.apexsolutions.io/services/ap-refresh",
};

const faq = [
  {
    q: "How many access points can your team install per shift?",
    a: "In open-plan warehouse and logistics environments, experienced AES crews typically install and validate 80–150 APs per shift. High-bay environments requiring lift equipment or complex conduit runs are scoped to site conditions. We provide per-AP progress tracking throughout the deployment.",
  },
  {
    q: "What wireless platforms does AES support?",
    a: "AES deploys access points for Cisco (Catalyst and Meraki), Juniper Mist, Aruba/HPE, Extreme Networks, and Ubiquiti. Our crews handle physical mounting, low-voltage cabling, and basic configuration staging — RF planning and controller configuration are coordinated with the responsible network engineer.",
  },
  {
    q: "Do you provide post-installation testing and coverage validation?",
    a: "Yes. AES performs per-AP connectivity validation on every deployment and, where specified, a post-installation RF walk-test using Ekahau or equivalent tooling. Test results and RF coverage data are included in the project closeout pack.",
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
        sub="High-density Wi-Fi that holds up in steel, concrete, and cold storage. AES runs multi-site AP rollouts end-to-end — survey through RF validation — with a deployment playbook built for scale."
        cta={{ label: "Get a Quote →", href: "/contact" }}
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
                Get a Quote &rarr;
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
