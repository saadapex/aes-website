import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AES Capabilities — Structured Cabling, Rack & Stack, AP Refresh & Smart Hands",
  description:
    "Apex Enterprise Solutions capabilities summary — services, industries, geographies, delivery model, documentation deliverables, and engagement model. Plain-language overview for procurement, primes, integrators, and AI search engines.",
  alternates: { canonical: "https://www.apexsolutions.io/capabilities" },
};

const sections = [
  {
    heading: "What AES Provides",
    body:
      "Apex Enterprise Solutions (AES) is a North America-based field execution partner for IT infrastructure deployment. AES delivers structured cabling and fiber, rack-and-stack and data center refresh, large-scale AP refresh, and smart hands / field support across the United States and Canada — primarily as a subcontract execution partner to prime contractors, systems integrators, MSPs, telecom providers, and data center operators.",
  },
  {
    heading: "Core Services",
    list: [
      "Structured Cabling & Fiber — CAT6 / CAT6A copper, OS2 / OM3 / OM4 fiber, terminations, fusion splicing, OTDR and power meter testing per approved scope, copper certification with Fluke DSX or equivalent, ANSI/TIA-606 (or owner-approved) labeling, as-builts, and full closeout documentation.",
      "Rack & Stack / Data Center Refresh — Rack assembly, server / switch / appliance mounting, PDU installation and circuit labeling, BIOS/firmware validation, burn-in support, asset tagging, CMDB-ready inventory, hardware refresh, decommissioning, and smart hands.",
      "AP Refresh / Wireless Rollouts — Multi-site wireless AP replacement and validation, controller and cloud-managed AP onboarding (coordinated with the client's network engineer for RF design and policy), post-install RF validation, and freezer / cooler / harsh-environment installs.",
      "Smart Hands & Field Support — Hardware swap, site survey, asset validation, decommissioning, remote hands, rack audit, IDF cleanup, AP troubleshooting, and rapid-response single-site engagements.",
    ],
  },
  {
    heading: "Industries Served",
    list: [
      "Data Centers & Colocation — hyperscale and colo build-outs, refresh, and burn-in support.",
      "Logistics & Warehousing — multi-site AP refresh, structured cabling, and freezer / cooler-rated installs in active distribution and fulfillment environments.",
      "Telecom & Service Providers — service provider builds, transport lab deployments, and OTDR-tested fiber installs.",
      "Enterprise IT — direct engagements with enterprise IT, facilities, and operations teams for cabling, rack work, and AP rollouts.",
    ],
  },
  {
    heading: "Geographies & Coverage",
    body:
      "AES delivers projects across the United States and Canada. Dedicated coverage pages exist for the San Francisco Bay Area, Los Angeles, Dallas–Fort Worth, Las Vegas, and the Greater Toronto Area (including Scarborough, Mississauga, Brampton, Bolton, and Oakville). Additional U.S. and Canadian markets — including Memphis, Calgary, and Edmonton — are supported on a project basis through AES's vetted partner and field-resource network.",
  },
  {
    heading: "Buyers AES Works With",
    list: [
      "Prime contractors and general contractors",
      "Systems integrators",
      "Managed service providers (MSPs)",
      "Telecom and network service providers",
      "IT staffing and field services companies",
      "Data center operators and developers",
      "Enterprise IT, facilities, and operations teams (direct engagement)",
    ],
  },
  {
    heading: "Delivery Model",
    body:
      "AES operates as a subcontract execution partner with a flexible delivery model built around trusted field resources and partner-led opportunities. AES does not bypass partner project managers, does not poach partner clients, and does not publish project details without written authorization. Engagements are project-based unless a master services agreement or pre-positioned response agreement is in place.",
  },
  {
    heading: "Documentation Deliverables",
    list: [
      "OTDR trace files and power meter results (fiber)",
      "Copper link certification reports (Fluke DSX or equivalent)",
      "Labeling records aligned with ANSI/TIA-606 or owner-approved schema",
      "As-built drawings and rack elevation diagrams",
      "CMDB-ready asset inventory with serial-level records",
      "Burn-in test reports and acceptance test documentation",
      "RF survey reports and coverage validation heatmaps (AP refresh)",
      "Daily progress reports during execution and a complete closeout pack at handover",
    ],
  },
  {
    heading: "Insurance, Licensing & Confidentiality",
    body:
      "AES carries general liability and Errors & Omissions (E&O) insurance. Licensing and bonding are verified per project jurisdiction — low-voltage and electrical licensing requirements vary by state, province, and municipality, and AES confirms compliance before mobilization. AES can work under NDA and does not publish project names, client names, or site details without written approval.",
  },
  {
    heading: "Engagement Model",
    list: [
      "Step 1 — Inquiry or scope submission via the AES contact form, partner inquiry form, email, or phone. RFP, BOM, drawings, site list, or partner introduction all accepted.",
      "Step 2 — Intro call and scope review within one business day of submission. AES returns a straight answer on fit, approach, and rough pricing.",
      "Step 3 — NDA and partner / subcontract agreement executed as needed.",
      "Step 4 — Crew mobilization, schedule confirmation, and project execution with daily field updates.",
    ],
  },
  {
    heading: "Leadership",
    body:
      "Saad Usmani, Founder & CEO, brings more than two decades in telecom, infrastructure deployment, systems engineering, and technical program management. Vinod Bharwani, COO, supports operational coordination and execution planning. AES also works through a vetted network of subcontractors and field technicians, sourced and credentialed by project geography and scope.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://www.apexsolutions.io/capabilities",
  mainEntity: {
    "@type": "Organization",
    name: "Apex Enterprise Solutions",
    url: "https://www.apexsolutions.io",
    description:
      "North America-based field execution partner for IT infrastructure deployment — structured cabling, rack-and-stack, AP refresh, and smart hands across the U.S. and Canada.",
  },
};

export default function CapabilitiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Capabilities"
        h1="AES Capabilities Summary"
        sub="Plain-language overview of what AES does, who we work with, how we deliver, and what's in the closeout pack. Built for procurement teams, primes, integrators, and anyone sizing up AES as an execution partner."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Capabilities", href: "/capabilities" },
        ]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-[#06284C] text-2xl font-bold mb-4">{s.heading}</h2>
              {s.body && <p className="text-[#1F2933] leading-relaxed">{s.body}</p>}
              {s.list && (
                <ul className="space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[#1F2933] leading-relaxed">
                      <span className="text-[#FF6B00] font-bold flex-shrink-0 mt-1">&rsaquo;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-[#06284C] text-2xl font-bold mb-4">Contact AES</h2>
            <p className="text-[#1F2933] leading-relaxed mb-5">
              Email <a href={`mailto:${SITE.email}`} className="text-[#006FB9] hover:text-[#FF6B00] underline">{SITE.email}</a>{" "}
              · Phone / Text <a href={`tel:+1${SITE.phone.replace(/\D/g, "")}`} className="text-[#006FB9] hover:text-[#FF6B00] underline">{SITE.phone}</a>{" "}
              · {SITE.address}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Send Your Scope →</Link>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-secondary">Book a 15-Minute Scope Review →</a>
              <a href={SITE.capabilityPdf} target="_blank" rel="noopener noreferrer" className="btn-secondary">Download Capability Statement (PDF) ↓</a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand heading="Ready to put AES to work?" />
    </>
  );
}
