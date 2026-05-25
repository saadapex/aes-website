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
  capabilityPdf: "/assets/Apex Enterprise Solutions – Capability Statement.pdf",
} as const;

export const STATS = [
  { value: "1,586+",        label: "APs Replaced · Multi-Site Program" },
  { value: "U.S. & Canada", label: "Field Deployment Coverage" },
  { value: "0",             label: "Recorded Safety Incidents · AES-Led Engagements" },
  { value: "On Schedule",   label: "Delivery · Documented Recent Deployments" },
] as const;

export const SERVICES = [
  {
    slug: "structured-cabling",
    title: "Structured Cabling",
    subtitle: "Copper & Fiber",
    subhead: "Certified copper & fiber that pass the test the first time.",
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
    subhead: "High-density Wi-Fi that survives steel, concrete, and cold storage.",
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
  },
] as const;

export const CASE_STUDIES = [
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
