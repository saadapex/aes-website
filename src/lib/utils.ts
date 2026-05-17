import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// AES Brand Colors (from Branding Document — Tech Orange System)
export const BRAND = {
  navy:    "#06284C", // Apex Navy — headers, nav, footer, hero BG
  blue:    "#006FB9", // Apex Blue — links, nodes, card accents
  orange:  "#FF6B00", // Tech Orange — ALL CTAs, highlights, priority callouts
  slate:   "#4E6575", // Steel Slate — captions, support text, diagrams
  charcoal:"#1F2933", // Charcoal — body text, labels
  offwhite:"#F4F7FA", // Cloud White — section & page backgrounds
} as const;

// AES site constants
export const SITE = {
  name: "Apex Enterprise Solutions",
  tagline: "INFRASTRUCTURE. DEPLOYMENT. PERFORMANCE.",
  email: "info@apexsolutions.io",
  phone: "(669) 251-7810",
  address: "1069 Duane Ct, Sunnyvale, CA 94085",
  calendly: "https://calendly.com/apexenterprisesolutions",
  linkedin: "https://www.linkedin.com/company/apexenterprisesolutions/",
  capabilityPdf: "/assets/Apex Enterprise Solutions – Capability Statement.pdf",
} as const;

export const STATS = [
  { value: "1,586+",      label: "Access Points Replaced in a Single Program" },
  { value: "U.S. & Canada", label: "Cross-Border Deployment Coverage" },
  { value: "0",           label: "Safety Incidents on Record" },
  { value: "100%",        label: "On-Time Project Delivery" },
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
    cta: "Book a Planning Call",
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
] as const;

export const INDUSTRIES = [
  {
    slug: "data-centers",
    title: "Data Centers & Colocation",
    headline: "Infrastructure Built for Data Center Scale",
    sub: "Rack-and-stack, cabling, and fiber for hyperscale halls and colocation builds.",
    services: ["rack-and-stack", "structured-cabling"],
  },
  {
    slug: "logistics-warehousing",
    title: "Logistics & Warehousing",
    headline: "Wireless & Low-Voltage for High-Throughput Warehouses",
    sub: "AP rollouts, structured cabling, and freezer/cooler-rated installs that keep operations running.",
    services: ["ap-refresh", "structured-cabling"],
  },
  {
    slug: "enterprise",
    title: "Enterprise & Corporate",
    headline: "Enterprise Infrastructure, Done Right the First Time",
    sub: "Copper, fiber, and wireless installs for campus, office, and multi-site enterprise deployments.",
    services: ["structured-cabling", "ap-refresh"],
  },
  {
    slug: "telecom",
    title: "Telecom & Service Providers",
    headline: "Field Execution for Telecom Infrastructure Builds",
    sub: "Structured cabling, rack-and-stack, and smart hands for service provider deployments across North America.",
    services: ["structured-cabling", "rack-and-stack"],
  },
] as const;

export const CASE_STUDIES = [
  {
    slug: "telecom-transport-lab",
    title: "Telecom Transport Lab Build-Out",
    tag: "RACK & STACK",
    location: "United States — Q1 2024",
    metrics: ["Delivered in 2 Weeks", "$24,400 Total Project Cost", "4 Platforms · 6 Racks Commissioned"],
    service: "rack-and-stack",
  },
  {
    slug: "fulfillment-ap-refresh-ontario",
    title: "Large-Scale AP Refresh — Ontario Fulfillment Centres",
    tag: "AP REFRESH",
    location: "Scarborough & Bolton, ON — Q1 2026",
    metrics: ["1,586+ Access Points Replaced", "2 Sites · 46 IDFs", "24hr Shutdown Window · 0 Safety Incidents"],
    service: "ap-refresh",
  },
  {
    slug: "amazon-ap-refresh",
    title: "Amazon Warehouse — AP Refresh & Low Voltage",
    tag: "AP REFRESH",
    location: "United States",
    metrics: ["850 APs installed", "98% first-pass rate", "On-schedule delivery"],
    service: "ap-refresh",
  },
] as const;
