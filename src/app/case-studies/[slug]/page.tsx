import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { CASE_STUDIES } from "@/lib/utils";

const IMAGES: Record<string, string> = {
  "ai-cluster-pod-build":           "/images/case-ai-cluster-compute-hall.jpg",
  "telecom-transport-lab":          "/images/case-telecom-lab.jpg",
  "fulfillment-ap-refresh-ontario": "/images/case-warehouse-ap.png",
  "amazon-ap-refresh":              "/images/case-amazon-ap.png",
};

const CONTENT: Record<string, {
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string;
  tags: string[];
  lessonsLearned?: { title: string; body: string }[];
}> = {
  "ai-cluster-pod-build": {
    overview: "A major generative AI research company engaged AES to deliver structured cabling and rack & stack work for a new GPU-dense data center in Memphis, Tennessee. The facility was built to house high-performance compute for training large AI models — requiring precision fiber management from the meet-me room to the compute racks, scalable rack infrastructure, and an aggressive deployment schedule. AES's prior hyperscale environment experience made it a strong fit for the scope.",
    challenge: "The project carried three concurrent constraints. GPU-dense compute requires low-latency, high-bandwidth fiber connectivity with disciplined cable management — sloppy fiber kills performance and adds risk at every future change. The schedule had to move fast to accelerate the client's research roadmap. And Memphis is not a major data-center labor market, so AES had to mobilize skilled fiber technicians from outside the region with travel, lodging, and per-diem coordination handled in parallel with the deployment itself.",
    approach: [
      "Phase 1 — Crew mobilization: AES staged 6–7 fiber and hardware technicians for the Memphis site, mixing senior and junior crew to balance speed and quality. Travel, lodging, and per-diem logistics were coordinated before crew arrival so day one was productive, not administrative.",
      "Phase 2 — Structured fiber installation: High-density fiber runs were installed from the meet-me room to the compute racks. Precision fiber management was implemented from the start — clean routing, labeled bundles, organized slack, and room for future scaling without re-pulling.",
      "Phase 3 — Rack & stack: AES assembled and installed the compute racks, mounted equipment, connected servers to power and network, and dressed fiber jumpers within each rack. The initial two-rack build was completed in a focused two-day push, with additional racks added across subsequent phases.",
      "Phase 4 — Sustained execution: The deployment ran across late 2024 and early 2025, with crew shifts including overtime to hold the schedule. Detailed labor and equipment tracking was maintained throughout for client visibility and post-project documentation.",
    ],
    outcome: "AES completed the structured cabling and rack & stack work on schedule, delivering a ready-for-integration data-center environment with GPU-dense compute capacity and precision fiber management. The infrastructure supported the client's AI training operations without bottlenecks at the cable plant or rack level. The facility now serves as a marquee reference for AES's ability to execute high-performance AI data-center builds under aggressive timelines in non-traditional data-center markets.",
    tags: ["Rack & Stack", "Structured Cabling", "Fiber", "AI / ML", "Data Center", "Memphis", "GPU-Dense Compute"],
    lessonsLearned: [
      { title: "Mobilization plan matters as much as scope", body: "In a market without deep local data-center labor, travel, lodging, and per-diem logistics are part of the schedule — not an afterthought. Plan them before mobilization, not as crews are arriving." },
      { title: "Focused scope improves quality", body: "Limiting AES's scope to structured fiber and rack & stack let the crew hold high standards on cleanliness, cable management, and rack consistency rather than spreading thin across adjacent disciplines." },
      { title: "Flexible crew sizing scales the program", body: "Mixing senior and junior fiber technicians lets AES scale labor up and down across phases without losing project knowledge between visits." },
      { title: "Precision fiber management pays compounding dividends", body: "Clean, labeled fiber routing from day one makes every subsequent rack add, hardware refresh, and troubleshooting visit faster and lower-risk." },
    ],
  },
  "telecom-transport-lab": {
    overview: "One of the largest U.S. energy providers serving approximately 9 million customers engaged AES to upgrade its internal telecom transport lab. The facility validates new telecom equipment before production deployment — a critical quality gate for the client's network. The refresh integrated DWDM optical, MPLS routing, and microwave transmission platforms across six racks and had to be completed in two weeks to keep network rollouts on schedule.",
    challenge: "The scope covered a full site audit, engineering drawings, complete installation and commissioning across six racks, and final as-built documentation. Speed was non-negotiable: future network rollouts depended on lab availability, and any delay would cascade downstream.",
    approach: [
      "Phase 1 - Site Survey: AES dispatched a senior engineer for a five-day on-site survey, mapping all existing racks, fiber cables, DC power feeds, and grounding layouts, cross-referenced against the client's design standards.",
      "Phase 2 - Engineering Documentation: AES produced detailed installation drawings covering rack positions, cable duct routes, DC power feeds, and grounding layouts. A granular cost model covered every task from procurement to acceptance testing, with a one-day contingency buffer built into the schedule.",
      "Phase 3 - Installation: A two-person team commissioned a Ciena 6500 T-Series, Ciena 6500 S-Series, Ciena 6500 Seven-Slot Chassis, Nokia 7250 IXR-R6DL Router, Adtran TA5000 Access Platform, and six two-post telecom racks with cable tray, fiber duct, and grounding. All cabling was dressed and labelled; functional tests confirmed every platform powered up and communicated over the lab network.",
      "Phase 4 - Handover: Final as-built documentation captured rack layout, cable routing, grounding scheme, and serial numbers. Acceptance-test reports were archived by the client's telecom engineering group as the baseline for future changes.",
    ],
    outcome: "The transport lab upgrade was completed within two weeks, keeping the client's rollout program on schedule. Six racks, DWDM and MPLS platforms, fiber ducting, and grounding improvements were delivered with full cost transparency. The project is now a referenceable template for future telecom lab build-outs.",
    tags: ["Rack & Stack", "Telecom", "DWDM", "MPLS", "Lab Build-Out", "Energy Sector"],
    lessonsLearned: [
      { title: "Conduct a thorough site survey first", body: "Documenting the existing environment before design work begins reduces rework and ensures installation drawings are accurate from day one." },
      { title: "Break scope into discrete tasks", body: "A granular cost and task breakdown provides clarity on resource and time requirements, making the project easier to manage and audit." },
      { title: "Build in contingency", body: "A schedule and cost buffer absorbs unexpected delays without affecting the delivery date." },
      { title: "Deliver comprehensive as-built documentation", body: "Final drawings, cable labels, and equipment lists prove invaluable for operations staff and serve as the baseline for future changes." },
    ],
  },
  "fulfillment-ap-refresh-ontario": {
    overview: "A global e-commerce and fulfillment leader initiated a network refresh program in early 2026, replacing aging wireless access points across approximately 24 North American sites including five Canadian facilities. AES executed the physical refresh at two Ontario locations: YYZ9 in Scarborough (476 APs across 23 network closets) and YYZ7 in Bolton (1,110 APs across 23 network closets), replacing over 1,586 access points in total.",
    challenge: "Warehouse ceilings reached 40 feet across four mezzanine levels, requiring scissor lifts maintained at full charge throughout each shift. Labelling was exacting: every AP required port identifier, logical name, serial number, and MAC address for the client's asset database. YYZ9 had a non-negotiable 24-hour shutdown window. YYZ7, with more than twice the AP count, demanded extended windows and a larger workforce.",
    approach: [
      "Pre-staging day before each shutdown: technicians visited each site the day prior to inventory APs, confirm scissor-lift availability, and pre-stage all equipment including fall-protection gear. This became standard practice across the program.",
      "YYZ9 Scarborough (24-hour window): A three-shift crew of 10-11 technicians rotated continuously. Shift 1 handled the top mezzanine and roof structures. Shift 2 covered lower mezzanine levels and main floor with labelling. Shift 3 ran a full verification sweep, qualification testing, and documentation sign-off.",
      "YYZ7 Bolton (extended window): A greater proportion of APs were pre-labelled before deployment. Scissor lifts and fall-protection gear were pre-staged. Work was divided by mezzanine level for parallel crew operation, with all Scarborough lessons applied directly.",
      "Real-time iPad-based tracking: each AP was logged in a shared spreadsheet as completed, ensuring no device was missed and enabling clean shift hand-offs with direct client engineering team communication.",
      "Safety enforcement: full PPE including safety shoes, high-visibility vests, hard hats, and gloves; harnesses and lanyards above 6 feet; mandatory spotters for all scissor-lift operations; VCO contractor orientation completed by every technician.",
    ],
    outcome: "All 1,586+ access points were replaced across both Ontario sites within Q1 2026. YYZ9 was completed within the 24-hour window. Warehouse staff reported improved wireless coverage, fewer drop-offs, and faster scanning speeds. Zero safety incidents were recorded at either site. The pre-labelling strategy, real-time documentation, and flexible staffing model were carried forward to the remaining facilities in the broader North American program.",
    tags: ["AP Refresh", "Wireless", "Ontario", "Fulfillment Centre", "Multi-Site", "Canada"],
    lessonsLearned: [
      { title: "Pre-planning is critical", body: "A dedicated inventory and staging day before each shutdown allows the team to confirm lift availability and identify hazards in advance." },
      { title: "Labelling strategy matters", body: "Pre-labelling APs before arrival reduces on-site labour and minimises errors. Where not feasible, technicians must have clear per-port instructions on hand." },
      { title: "Safety is non-negotiable", body: "Zero incidents at both sites was achieved through consistent PPE, harnesses, lanyards, mandatory spotters, and contractor orientation." },
      { title: "Real-time documentation drives accountability", body: "iPad-based progress tracking ensured no AP was left behind and enabled clean shift hand-offs across a 24-hour window." },
    ],
  },
  "amazon-ap-refresh": {
    overview: "AES supported field execution for a large-scale wireless AP refresh program at a major e-commerce fulfillment operator in the United States. Working through an implementation partner, the scope included AP replacement support across high-ceiling warehouse environments, hardware handling, installation, labelling, and daily progress reporting — all within active logistics operations.",
    challenge: "The fulfillment facilities operate continuously with strict change control windows and elevated safety requirements. Every technician required client-specific safety orientation before site access, and all work had to be scheduled around active conveyor, robotics, and pick operations. Maintaining momentum without disrupting warehouse operations was the defining constraint on the project.",
    approach: [
      "Safety orientation and site badging coordinated for the full field crew in advance of mobilization, ensuring no day-one delays on access or compliance.",
      "Pre-deployment review of AP placement drawings and mounting hardware specifications. All hardware kitted and staged before arriving on site — no improvisation in the field.",
      "Structured daily progress reporting to the implementation partner's project lead. Each AP logged by MAC address, mount location, and controller association status at end of each shift.",
      "Quality checks at regular intervals throughout the deployment: signal strength and controller handshake validated before the crew advanced to the next zone.",
      "All closeout documentation submitted in the client's required format, including AP inventory, mount records, and coverage validation results.",
    ],
    outcome: "850 APs installed and validated on schedule. The implementation partner confirmed full controller association and coverage sign-off within 48 hours of installation completion. The project was delivered without a single safety incident, and AES received positive feedback from the partner's project management team.",
    tags: ["AP Refresh", "Wireless", "Fulfillment Centre", "Logistics", "U.S. Market"],
  },
};

// Hand-crafted meta descriptions — complete sentences, under 155 chars, outcome-first
const META_DESCRIPTIONS: Record<string, string> = {
  "ai-cluster-pod-build":
    "AES delivered structured cabling and rack & stack for a GPU-dense AI data center in Memphis, TN — precision fiber management and scalable rack infrastructure for high-performance compute.",
  "telecom-transport-lab":
    "AES built a DWDM, MPLS, and microwave telecom transport lab for a U.S. energy provider — 6 racks, 4 platforms, commissioned in 2 weeks.",
  "fulfillment-ap-refresh-ontario":
    "AES replaced 1,586+ wireless APs across two Ontario fulfillment centres (YYZ9 Scarborough, YYZ7 Bolton) in Q1 2026. 24hr window, zero safety incidents.",
  "amazon-ap-refresh":
    "AES field-executed a large-scale AP refresh at a U.S. fulfillment operator — 850 APs installed and validated on schedule. Zero safety incidents.",
};

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: META_DESCRIPTIONS[params.slug] ?? cs.title,
    alternates: { canonical: `https://www.apexsolutions.io/case-studies/${params.slug}` },
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

      {IMAGES[cs.slug] && (
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <Image src={IMAGES[cs.slug]} alt={cs.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06284C]/30 to-[#06284C]/10" />
        </div>
      )}

      <section className="bg-[#06284C] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {cs.metrics.map((metric) => (
            <div key={metric}>
              <p className="text-[#FF6B00] text-2xl font-black mb-1">{metric}</p>
            </div>
          ))}
        </div>
      </section>

      {content ? (
        <section className="bg-white section-pad">
          <div className="max-w-3xl mx-auto space-y-12 text-[#1F2933] leading-relaxed">

            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <span key={tag} className="bg-[#F4F7FA] border border-[#006FB9]/20 text-[#06284C] text-xs font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <h2 className="text-[#06284C] text-2xl font-bold mb-4">Project Overview</h2>
              <p>{content.overview}</p>
            </div>

            <div>
              <h2 className="text-[#06284C] text-2xl font-bold mb-4">The Challenge</h2>
              <p>{content.challenge}</p>
            </div>

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

            <div className="bg-[#F4F7FA] rounded-xl p-8 border-l-4 border-[#FF6B00]">
              <h2 className="text-[#06284C] text-2xl font-bold mb-4">Outcome</h2>
              <p>{content.outcome}</p>
            </div>

            {content.lessonsLearned && content.lessonsLearned.length > 0 && (
              <div>
                <h2 className="text-[#06284C] text-2xl font-bold mb-6">Lessons Learned</h2>
                <div className="space-y-4">
                  {content.lessonsLearned.map((lesson) => (
                    <div key={lesson.title} className="flex gap-4">
                      <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#FF6B00]" />
                      <div>
                        <p className="font-semibold text-[#06284C] mb-1">{lesson.title}</p>
                        <p className="text-[#4E6575] text-sm">{lesson.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
