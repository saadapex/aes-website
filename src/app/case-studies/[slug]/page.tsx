import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { CASE_STUDIES } from "@/lib/utils";

const IMAGES: Record<string, string> = {
  "telecom-transport-lab":          "/images/case-telecom-lab.png",
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
  "telecom-transport-lab": {
    overview: "One of the largest U.S. energy providers serving approximately 9 million customers engaged AES to upgrade its internal telecom transport lab. The facility validates new telecom equipment before production deployment, making it a critical quality gate. The refresh integrated DWDM, MPLS, and microwave platforms across six racks and had to be completed in two weeks to keep network rollouts on schedule.",
    challenge: "The scope covered a full site audit, engineering drawings, complete installation and commissioning across six racks, and final as-built documentation. Speed was non-negotiable: future network rollouts depended on lab availability, and any delay would cascade downstream.",
    approach: [
      "Phase 1 - Site Survey: AES dispatched a senior engineer for a five-day on-site survey, mapping all existing racks, fibre cables, DC power feeds, and grounding layouts, cross-referenced against the client's design standards.",
      "Phase 2 - Engineering Documentation: AES produced Visio/Draw.io installation drawings covering rack positions, fibre-duct routes, DC power feeds, and grounding. A granular cost model covered every task from procurement to acceptance testing, with a one-day contingency buffer built into the schedule.",
      "Phase 3 - Installation: A two-person team commissioned a Ciena 6500 T-Series, Ciena 6500 S-Series, Ciena 6500 Seven-Slot Chassis, Nokia 7250 IXR-R6DL Router, Adtran TA5000 Access Platform, and six two-post telecom racks with cable tray, fibre duct, and grounding. All cabling was dressed and labelled; functional tests confirmed every platform powered up and communicated over the lab network.",
      "Phase 4 - Handover: Final as-built documentation captured rack layout, cable routing, grounding scheme, and serial numbers. Acceptance-test reports were archived by the client's telecom engineering group as the baseline for future changes.",
    ],
    outcome: "The transport lab upgrade was completed within two weeks, keeping the client's rollout program on schedule. Six racks, DWDM and MPLS platforms, fibre ducting, and grounding improvements were delivered with full cost transparency. The project is now a referenceable template for future telecom lab build-outs.",
    tags: ["Rack & Stack", "Telecom", "DWDM", "MPLS", "Lab Build-Out", "Energy Sector"],
    lessonsLearned: [
      { title: "Conduct a thorough site survey first", body: "Documenting the existing environment before design work begins reduces rework and ensures installation drawings are accurate from day one." },
      { title: "Break scope into discrete tasks", body: "A granular cost and task breakdown provides clarity on resource and time requirements, making the project easier to manage and audit." },
      { title: "Build in contingency", body: "A schedule and cost buffer absorbs unexpected delays without affecting the delivery date." },
      { title: "Deliver comprehensive as-built documentation", body: "Final drawings, cable labels, and equipment lists prove invaluable for operations staff and serve as the baseline for future changes." },
    ],
  },
  "fulfillment-ap-refresh-ontario": {
    overview: "A global e-commerce and fulfilment leader initiated a network refresh program in early 2026, replacing ageing wireless access points across approximately 24 North American sites including five Canadian facilities. AES executed the physical refresh at two Ontario locations: YYZ9 in Scarborough (476 APs, 23 IDFs) and YYZ7 in Bolton (1,110 APs, 23 IDFs), replacing over 1,586 access points in total.",
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
    overview: "AES was engaged to execute a large-scale AP refresh across Amazon fulfillment center infrastructure in the United States. The project involved installing 850 wireless access points across high-ceiling warehouse environments, coordinating with Amazon's network team on controller onboarding, and delivering a validated coverage and performance sign-off.",
    challenge: "Amazon fulfillment centers operate continuously with strict change control windows and elevated safety requirements. Every technician required Amazon-specific safety orientation before site access, and all work had to be scheduled around active conveyor, robotics, and pick operations. The 98% first-pass installation target was non-negotiable.",
    approach: [
      "AES coordinated safety orientation and badging for the full field crew in advance of mobilization to avoid any day-one delays.",
      "Pre-deployment review of Amazon's AP placement drawings and mounting hardware specifications. AES sourced and kitted all mounting hardware to spec before arriving on site.",
      "Structured daily progress reporting to Amazon's IT project lead, with each AP logged by MAC address, mount location, and controller association status.",
      "Quality checkpoint at every 50 APs: a senior technician validated signal strength and controller handshake before the crew advanced, driving the 98% first-pass rate.",
      "All documentation submitted in Amazon's required format for final sign-off.",
    ],
    outcome: "850 APs installed and validated on schedule with a 98% first-pass rate. Amazon's network team confirmed full controller association and coverage sign-off within 48 hours of installation completion. The project was delivered without a single safety incident.",
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
    description: (content?.overview ?? "").slice(0, 155) + "...",
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
