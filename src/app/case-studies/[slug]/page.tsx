import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { CASE_STUDIES } from "@/lib/utils";

const IMAGES: Record<string, string> = {
  "ai-cluster-pod-build": "/images/case-ai-cluster.png",
  "warehouse-ap-refresh":  "/images/case-warehouse-ap.png",
  "amazon-ap-refresh":     "/images/case-amazon-ap.png",
};

/* ── Per-case-study full content ── */
const CONTENT: Record<string, {
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string;
  tags: string[];
}> = {
  "ai-cluster-pod-build": {
    overview:
      "A national systems integrator engaged AES to execute the physical infrastructure buildout of a high-density AI compute pod in a Tennessee data center. The deployment comprised 48 racks across two rows, each loaded with GPU servers, top-of-rack switching, and high-density fiber to a central spine. The client required zero punch items at handover and a 72-hour burn-in sign-off before cutover.",
    challenge:
      "The site had a compressed 3-week delivery window with no room for rescheduling — the GPU hardware was pre-staged and the customer's training workload had a hard start date. Cable management complexity was high: 192 × 400G QSFP-DD fiber links had to be routed, labeled, and OTDR-certified within a tightly packed overhead tray system. Any re-pull would have cascaded schedule risk across all 48 racks.",
    approach: [
      "Site walk and BOM review completed two weeks prior to mobilization. AES submitted a detailed method statement, rack elevation drawings, and fiber routing plan for integrator approval before a single cable was pulled.",
      "Dedicated 6-technician crew mobilized on-site with all consumables staged. Rack assembly and mounting hardware installed row-by-row to maintain clean working zones.",
      "All 192 fiber runs completed sequentially with inline OTDR certification — results uploaded to shared documentation portal in real time so the integrator's PM could track progress remotely.",
      "72-hour burn-in monitored by AES field lead. Thermal and power draw logged per rack. Zero critical events recorded.",
      "Full closeout package delivered at handover: as-built rack diagrams, OTDR test reports, label schema, and a signed punch list with zero open items.",
    ],
    outcome:
      "The AI cluster went live on schedule with no rework required. The integrator submitted the closeout package to their end customer within 24 hours of handover — a first for this project team. AES has since been engaged as the preferred field execution partner for two additional pod deployments at the same facility.",
    tags: ["Rack & Stack", "Fiber Optics", "Data Center", "Tennessee"],
  },
  "warehouse-ap-refresh": {
    overview:
      "A large logistics operator needed to refresh aging wireless infrastructure across two major distribution centers — one in Toronto, Ontario and one in Las Vegas, Nevada — without disrupting active warehouse operations. AES was brought in as the field execution partner to manage AP removal, mounting, cabling, and validation across both sites concurrently.",
    challenge:
      "The warehouses were live 20 hours a day. Any disruption to the wireless network risked stopping pick-and-pack operations and triggering SLA penalties for the end customer. The AP mounting heights ranged from 25 to 40 feet, requiring man-lift coordination and safety permitting on a compressed timeline. Dual-country scope added cross-border logistics complexity for tooling and technician deployment.",
    approach: [
      "AES coordinated separate field pods for Toronto and Las Vegas to run the refresh in parallel, compressing the total deployment window from 6 weeks to 3.",
      "Detailed site surveys and heat map reviews completed at both locations prior to mobilization. AP placement confirmed against RF design to ensure ≥95% coverage before a single mount was drilled.",
      "Man-lift scheduling coordinated with warehouse operations management to protect peak picking hours. All overhead work conducted during off-peak windows (1 AM – 6 AM).",
      "Each AP installed, cabled, and validated against the client's WLAN controller before the lift moved to the next mount point — no batch validates at end of shift.",
      "Canada-specific cabling standards (CSA vs. NEC) followed for the Toronto site. AES provided a single integrated closeout pack covering both jurisdictions.",
    ],
    outcome:
      "1,200 WAPs installed across two countries in under 3 weeks with zero unplanned downtime to warehouse operations. Coverage validation exceeded the ≥95% target at both sites on first pass. The logistics operator has since awarded AES a standing field execution agreement for future wireless refresh work.",
    tags: ["AP Refresh", "Wireless", "Multi-Site", "Canada", "Nevada"],
  },
  "amazon-ap-refresh": {
    overview:
      "AES was engaged to execute a large-scale AP refresh across Amazon fulfillment center infrastructure in the United States. The project involved installing 850 wireless access points across high-ceiling warehouse environments, coordinating with Amazon's network team on controller onboarding, and delivering a validated coverage and performance sign-off.",
    challenge:
      "Amazon fulfillment centers operate continuously with strict change control windows and elevated safety requirements. Every technician required Amazon-specific safety orientation before site access, and all work had to be scheduled around active conveyor, robotics, and pick operations. The 98% first-pass installation target was non-negotiable — any re-visit carried a significant cost and schedule penalty.",
    approach: [
      "AES coordinated safety orientation and badging for the full field crew in advance of mobilization to avoid any day-one delays.",
      "Pre-deployment review of Amazon's AP placement drawings and mounting hardware specifications. AES sourced and kitted all mounting hardware to spec before arriving on site — no improvisation in the field.",
      "Structured daily progress reporting to Amazon's IT project lead. Each AP logged by MAC address, mount location, and controller association status at end of each shift.",
      "Quality checkpoint at every 50 APs: a senior technician validated signal strength and controller handshake before the crew advanced. This approach drove the 98% first-pass rate.",
      "All documentation — AP inventory, mount photos, coverage validation results — submitted in Amazon's required format for final sign-off.",
    ],
    outcome:
      "850 APs installed and validated on schedule with a 98% first-pass rate. Amazon's network team confirmed full controller association and coverage sign-off within 48 hours of installation completion. The project was delivered without a single safety incident, and AES received positive feedback from Amazon's vendor management team.",
    tags: ["AP Refresh", "Wireless", "Enterprise", "Fulfillment Center"],
  },
};

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug);
  const content = cs ? CONTENT[cs.slug] : null;
  if (!cs) return {};
  return {
    title: cs.title,
    description: content?.overview.slice(0, 155) + "…",
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  const content = CONTENT[cs.slug];

  return (
    <>
      <PageHero
        eyebrow={cs.tag}
        h1={cs.title}
        sub={cs.location}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.title, href: `/case-studies/${cs.slug}` },
        ]}
      />

      {/* Hero image */}
      {IMAGES[cs.slug] && (
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <Image
            src={IMAGES[cs.slug]}
            alt={cs.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06284C]/30 to-[#06284C]/10" />
        </div>
      )}

      {/* Metrics band */}
      <section className="bg-[#06284C] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {cs.metrics.map((metric) => (
            <div key={metric}>
              <p className="text-[#FF6B00] text-2xl font-black mb-1">{metric}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full case study content */}
      {content ? (
        <section className="bg-white section-pad">
          <div className="max-w-3xl mx-auto space-y-12 text-[#1F2933] leading-relaxed">

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <span key={tag}
                  className="bg-[#F4F7FA] border border-[#006FB9]/20 text-[#06284C] text-xs font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-[#06284C] text-2xl font-bold mb-4">Project Overview</h2>
              <p>{content.overview}</p>
            </div>

            {/* Challenge */}
            <div>
              <h2 className="text-[#06284C] text-2xl font-bold mb-4">The Challenge</h2>
              <p>{content.challenge}</p>
            </div>

            {/* Approach */}
            <div>
              <h2 className="text-[#06284C] text-2xl font-bold mb-4">How AES Executed</h2>
              <ol className="space-y-4 list-none pl-0">
                {content.approach.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#FF6B00] text-white text-xs font-black rounded-full flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Outcome */}
            <div className="bg-[#F4F7FA] rounded-xl p-8 border-l-4 border-[#FF6B00]">
              <h2 className="text-[#06284C] text-2xl font-bold mb-4">Outcome</h2>
              <p>{content.outcome}</p>
            </div>

          </div>
        </section>
      ) : (
        <section className="bg-white section-pad">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#4E6575] text-center">Full case study details coming soon.</p>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
