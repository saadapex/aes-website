import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BRAND = {
  navy:    "#06284C",
  blue:    "#006FB9",
  orange:  "#FF6B00",
  slate:   "#4E6575",
  charcoal:"#1F2933",
  offwhite:"#F4F7FA",
} as const;

export const SITE = {
  name: "Apex Enterprise Solutions",
  tagline: "INFRASTRUCTURE. DEPLOYMENT. PERFORMANCE.",
  email: "info@apexsolutions.io",
  phone: "(669) 251-7810",
  address: "1069 Duane Ct, Sunnyvale, CA 94085",
  calendly: "https://calendly.com/apexenterprisesolutions/meeting",
  linkedin: "https://www.linkedin.com/company/apexenterprisesolutions/",
  twitter: "https://x.com/apexensolutions",
  instagram: "https://www.instagram.com/apexenterprisesolutions",
  facebook: "https://www.facebook.com/apexenterprisesolutions",
  capabilityPdf: "/assets/Apex-Enterprise-Solutions-Capability-Statement.pdf",
} as const;

export const SERVICES = [
  {
    slug: "structured-cabling",
    title: "Structured Cabling",
    subtitle: "Copper & Fiber",
    subhead: "Copper & fiber installed, tested, labeled, and documented to approved scope.",
    cta: "Request a Site Walk",
    ctaHref: "/contact",
    ctaType: "form" as const,
  },
  {
    slug: "rack-and-stack",
    title: "Rack & Stack",
    subtitle: "Data Center Build & Refresh",
    subhead: "From bare room to live racks — fast.",
    cta: "Book a Call",
    ctaHref: "calendly",
    ctaType: "calendly" as const,
  },
  {
    slug: "ap-refresh",
    title: "AP Refresh",
    subtitle: "Large-Scale Wireless Rollouts",
    subhead: "High-density Wi-Fi deployments for steel, concrete, and cold-storage environments.",
    cta: "Get a Quote",
    ctaHref: "/contact",
    ctaType: "form" as const,
  },
  {
    slug: "smart-hands",
    title: "Smart Hands & Field Support",
    subtitle: "Remote Hands · Site Survey · Decommissioning",
    subhead: "Vetted hands on the ground when you need a single-site fix, audit, or rapid response.",
    cta: "Send Your Scope",
    ctaHref: "/contact",
    ctaType: "form" as const,
  },
] as const;

export const INDUSTRIES = [
  {
    slug: "data-centers",
    title: "Data Centers & Colocation",
    headline: "Infrastructure Built for Data Center Scale",
    sub: "Rack-and-stack, structured cabling, and fiber executed to spec — from bare room to live racks in hyperscale halls and colo builds.",
    image: { src: "/images/industry-data-centers.png", alt: "Field technician inside a hyperscale data center reviewing rack documentation" },
    services: ["rack-and-stack", "structured-cabling"],
    painPoints: [
      {
        heading: "Commissioning Windows Don't Move",
        body: "Go-live dates are fixed. Every delay in the field cascades into contract penalties, missed SLAs, and a conversation nobody wants to have. AES builds to the schedule — not around it.",
      },
      {
        heading: "First-Pass Quality Is Non-Negotiable",
        body: "Rework in a live data hall is expensive, disruptive, and sometimes impossible. Cable management, PDU placement, and fiber runs must be right before the hall goes live.",
      },
      {
        heading: "Documentation Has to Hold Up",
        body: "Hyperscale clients and colo operators require OTDR certification, as-built drawings, and rack-level asset inventories at handover — not three weeks later.",
      },
      {
        heading: "Crews Need to Know the Environment",
        body: "Data center sites have strict access controls, safety protocols, and change-window discipline. AES crews arrive credentialed, briefed, and ready — not trained on arrival.",
      },
    ],
    kpis: [
      { value: "1,000+", label: "Racks Across AES Team & Partner Ecosystem Experience" },
      { value: "Clean",  label: "Pre-Handover Punch-List Discipline" },
      { value: "72 hr",  label: "Burn-In Support Window" },
    ],
    caseStudySlug: "telecom-transport-lab",
    faq: [
      {
        q: "Does AES work in hyperscale and colocation data center environments?",
        a: "Yes. AES delivers rack-and-stack, structured cabling, fiber installation, and burn-in support across hyperscale data halls and colo cages. We work to client access protocols, label schemas, and commissioning windows — not around them.",
      },
      {
        q: "Can AES handle GPU-dense and AI cluster rack-and-stack work?",
        a: "Yes. AES has executed GPU-dense compute pod builds requiring high-density 400G fabric cabling and disciplined cable management. We staff senior fiber and hardware technicians, and the work is performed to the standards the client's network engineering team requires.",
      },
      {
        q: "What documentation does AES deliver at handover on a data center engagement?",
        a: "Per approved scope: OTDR trace files and power meter results on fiber, copper link certification reports, ANSI/TIA-606 (or owner-approved) labeling records, as-built drawings, rack elevation diagrams, CMDB-ready asset inventory, and burn-in test reports. The full closeout pack is delivered at handover — not chased later.",
      },
    ],
  },
  {
    slug: "logistics-warehousing",
    title: "Logistics & Warehousing",
    headline: "Wireless & Low-Voltage for High-Throughput Warehouses",
    sub: "AP rollouts, structured cabling, and freezer/cooler-rated installs — scheduled around active operations to minimize disruption to throughput.",
    image: { src: "/images/industry-logistics.jpg", alt: "Field technician on a scissor lift installing a wireless AP in a large distribution warehouse" },
    services: ["ap-refresh", "structured-cabling"],
    painPoints: [
      {
        heading: "Operations Cannot Stop for Infrastructure",
        body: "Picking floors run 24/7. AP installs, cable pulls, and cutover windows must be planned around live shifts — not the other way around. AES specializes in change-window discipline.",
      },
      {
        heading: "High Ceilings and Steel Kill Signal",
        body: "40-foot clear-heights, steel mezzanines, dense racking, and forklift traffic create RF environments that generic AP placement will not solve. On-site surveys and validation heatmaps are standard.",
      },
      {
        heading: "Cold Storage Needs Different Materials",
        body: "Freezer and cooler-rated cable, conduit, and mounting hardware are required in temperature-controlled zones. AES sources and installs to spec — no shortcuts that fail in six months.",
      },
      {
        heading: "Scale Means Coordination, Not Just Techs",
        body: "Multi-site, multi-IDF programs require daily field updates, pre-staged equipment, and crew rotations. A single technician with a ladder is not a program — AES runs programs.",
      },
    ],
    kpis: [
      { value: "1,586+", label: "APs Replaced Across a Documented Multi-Site Program" },
      { value: "46",     label: "IDFs Across 2 Sites" },
      { value: "0",      label: "Recorded Safety Incidents · Documented AES-Led Engagements" },
    ],
    caseStudySlug: "fulfillment-ap-refresh-ontario",
    faq: [
      {
        q: "Can AES execute multi-site warehouse AP refresh in active 24/7 operations?",
        a: "Yes. AES regularly executes multi-site, multi-IDF AP refresh programs across active picking floors — scheduling around live shifts, coordinating with site operations teams, and running daily field updates. The documented Q1 2026 Ontario program covered 1,586+ APs across two fulfillment centres without disrupting throughput.",
      },
      {
        q: "Does AES handle freezer and cooler-rated installations?",
        a: "Yes. Cold-chain logistics work requires freezer / cooler-rated cable, mounting hardware, AP enclosures, and crew PPE. AES sources and installs to spec — no shortcuts that fail when the temperature drops.",
      },
      {
        q: "How does AES coordinate field crews across multi-site rollouts?",
        a: "AES runs program-level coordination, not single-truck dispatch: pre-staged equipment, pre-labelled hardware where feasible, daily field reports, real-time per-AP tracking, and clean shift hand-offs. Your PM gets visibility into every site every day, not just at closeout.",
      },
    ],
  },
  {
    slug: "telecom",
    title: "Telecom & Service Providers",
    headline: "Field Execution for Telecom Infrastructure Builds",
    sub: "Structured cabling, rack-and-stack, and smart hands for service provider deployments — credentialed crews, OTDR-certified, across North America.",
    image: { src: "/images/industry-telecom.jpg", alt: "Technician routing fiber optic patch cables in a telecom central office distribution frame" },
    services: ["structured-cabling", "rack-and-stack"],
    painPoints: [
      {
        heading: "OTDR Certification Is Mandatory — Not Optional",
        body: "Service provider builds require OTDR test results on every fiber run before acceptance. AES treats certification as part of the install, not an afterthought at closeout.",
      },
      {
        heading: "Asset Schemas Must Match Client Systems",
        body: "Rack labeling, cable IDs, and asset records must align with your client's CMDB and inventory schema before handover. AES works to your label format and delivers CMDB-ready documentation.",
      },
      {
        heading: "Smart Hands Needs to Show Up Ready",
        body: "Remote hands engagements fail when crews arrive unfamiliar with the site or the equipment. AES field resources are briefed, credentialed, and capable — not dispatched from a staffing list.",
      },
      {
        heading: "Tight Build Timelines Are the Norm",
        body: "Telecom builds move fast. AES has delivered a full 4-platform, 6-rack transport lab in two weeks. Speed is built into how we staff, stage, and execute.",
      },
    ],
    kpis: [
      { value: "2 Weeks", label: "Telecom Lab Delivered Start-to-Finish" },
      { value: "6 Racks", label: "Commissioned with Clean Punch-List Clearance" },
      { value: "OTDR + PM", label: "Fiber Testing per Approved Scope" },
    ],
    caseStudySlug: "telecom-transport-lab",
    faq: [
      {
        q: "Does AES support service provider transport lab builds?",
        a: "Yes. AES delivered a 4-platform, 6-rack DWDM / MPLS / microwave transport lab for a U.S. energy provider in two weeks — site survey, installation drawings, commissioning, and as-built documentation included. Service provider lab builds are one of AES's core engagement types.",
      },
      {
        q: "Is OTDR certification standard on AES fiber work?",
        a: "Fiber is tested with OTDR and power meter per approved scope. Trace files, power meter results, and link certification reports are part of the closeout package — not an afterthought. Copper links are certified separately with a Fluke DSX or equivalent field tester.",
      },
      {
        q: "Can AES work to a service provider's labeling and CMDB schema?",
        a: "Yes. AES delivers labeling records aligned to ANSI/TIA-606 or to the owner / client's approved schema. CMDB-ready asset inventory with serial-level records is provided at handover so your back-office systems update cleanly.",
      },
    ],
  },
] as const;

export const CASE_STUDIES = [
  {
    slug: "ai-cluster-pod-build",
    title: "AI Cluster Pod Build — GPU-Dense Data Center",
    tag: "RACK & STACK",
    location: "Memphis, TN — Q4 2024 / Q1 2025",
    metrics: ["GPU-Dense Compute Build", "Structured Fiber + Rack & Stack", "6–7 Tech Crew Mobilization"],
    service: "rack-and-stack",
  },
  {
    slug: "telecom-transport-lab",
    title: "Telecom Transport Lab Build-Out",
    tag: "RACK & STACK",
    location: "United States — Q1 2024",
    metrics: ["Delivered in 2 Weeks", "DWDM · MPLS · Microwave Transport", "4 Platforms · 6 Racks Commissioned"],
    service: "rack-and-stack",
  },
  {
    slug: "fulfillment-ap-refresh-ontario",
    title: "Large-Scale AP Refresh — Ontario Fulfillment Centres",
    tag: "AP REFRESH",
    location: "Scarborough & Bolton, ON — Q1 2026",
    metrics: ["1,586+ Access Points Replaced", "2 Sites · 46 IDFs", "24hr Shutdown Window · 0 Recorded Safety Incidents"],
    service: "ap-refresh",
  },
  {
    slug: "amazon-ap-refresh",
    title: "Large-Scale Warehouse AP Refresh — U.S. Market",
    tag: "AP REFRESH",
    location: "United States",
    metrics: ["850 APs Installed", "Active Logistics Environment", "On-Schedule Delivery"],
    service: "ap-refresh",
  },
] as const;
