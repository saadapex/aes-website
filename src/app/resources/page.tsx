import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { FileText, Download, ClipboardCheck, Lightbulb } from "lucide-react";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources — RFP Templates, Checklists & Buyer Guides",
  description:
    "Downloadable resources from AES — structured cabling RFP template, capability statement, planning checklists, and buyer guides for primes, integrators, and enterprise IT teams.",
  alternates: { canonical: "https://www.apexsolutions.io/resources" },
};

interface Resource {
  title: string;
  type: "Template" | "Statement" | "Checklist" | "Guide";
  description: string;
  pages?: string;
  href: string;
  status: "available" | "coming-soon";
  audience: string;
}

const RESOURCES: Resource[] = [
  {
    title: "AES Capability Statement",
    type: "Statement",
    description:
      "One-page summary of AES services, coverage, delivery model, and engagement model. Built to share with procurement, finance, or anyone sizing up AES as a deployment partner.",
    href: SITE.capabilityPdf,
    status: "available",
    audience: "Procurement · Primes · Integrators",
  },
  {
    title: "Structured Cabling RFP Template",
    type: "Template",
    description:
      "Editable RFP template covering scope of work, technical specifications, deliverables, schedule, pricing, qualifications, and evaluation criteria. Pre-built to procurement standards — drop in your project details and send it out.",
    pages: "22 pages · Interactive form fields",
    href: "/assets/AES_Structured_Cabling_RFP_Template_v2.2.pdf",
    status: "available",
    audience: "Primes · Integrators · Enterprise IT",
  },
  {
    title: "AP Refresh Planning Checklist",
    type: "Checklist",
    description:
      "Field-tested planning checklist for large-scale warehouse and enterprise AP refresh programs — site readiness, IDF preparation, equipment staging, validation, and closeout.",
    href: "/contact?resource=ap-refresh-checklist",
    status: "coming-soon",
    audience: "Enterprise IT · MSPs · Facilities Managers",
  },
  {
    title: "Rack & Stack Closeout Checklist",
    type: "Checklist",
    description:
      "Pre-handover punch-list checklist for data center rack-and-stack programs — labeling, documentation, burn-in records, asset reconciliation, and closeout pack contents.",
    href: "/contact?resource=rack-stack-checklist",
    status: "coming-soon",
    audience: "Data Center Operators · Primes · Enterprise IT",
  },
  {
    title: "Fiber OTDR Closeout Package — Sample",
    type: "Guide",
    description:
      "What a complete OTDR closeout package looks like, with sample reports, label schemas, and as-built drawings. Useful for buyers comparing bids or setting acceptance criteria.",
    href: "/contact?resource=otdr-closeout-sample",
    status: "coming-soon",
    audience: "Primes · Integrators · Telecom Operators",
  },
  {
    title: "Hiring a Deployment Partner — Buyer Guide",
    type: "Guide",
    description:
      "Ten questions every enterprise IT or facilities team should ask before hiring a low-voltage or field deployment partner. Built for end-user decision-makers, not subcontractors.",
    href: "/contact?resource=buyer-guide",
    status: "coming-soon",
    audience: "Enterprise IT · Facilities · Operations Leaders",
  },
];

const TYPE_ICONS = {
  Template: FileText,
  Statement: FileText,
  Checklist: ClipboardCheck,
  Guide: Lightbulb,
};

export default function ResourcesPage() {
  const available = RESOURCES.filter((r) => r.status === "available");
  const upcoming = RESOURCES.filter((r) => r.status === "coming-soon");

  return (
    <>
      <PageHero
        eyebrow="Resources"
        h1="Templates, Checklists &amp; Buyer Guides"
        sub="Practical, field-tested resources for primes, integrators, enterprise IT teams, and anyone scoping infrastructure deployment work. Free to download — no email gate."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }]}
      />

      {/* Available now */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Available Now</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-10">Download &amp; Use</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {available.map((r) => {
              const Icon = TYPE_ICONS[r.type];
              return (
                <div key={r.title} className="bg-[#F4F7FA] rounded-xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg border border-[#006FB9]/20 flex-shrink-0">
                      <Icon size={22} className="text-[#FF6B00]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[#006FB9] text-xs uppercase tracking-wide font-semibold">{r.type}</span>
                      <h3 className="text-[#06284C] font-bold text-lg mt-1">{r.title}</h3>
                      {r.pages && <p className="text-[#4E6575] text-xs mt-0.5">{r.pages}</p>}
                    </div>
                  </div>
                  <p className="text-[#1F2933] text-sm leading-relaxed mb-4">{r.description}</p>
                  <p className="text-[#4E6575] text-xs uppercase tracking-wide mb-5">For: {r.audience}</p>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 text-sm"
                  >
                    <Download size={14} /> Download PDF
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      {upcoming.length > 0 && (
        <section className="bg-[#F4F7FA] section-pad">
          <div className="max-w-7xl mx-auto">
            <p className="eyebrow mb-3">Coming Soon</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-4">In Development</h2>
            <p className="text-[#4E6575] text-sm mb-10 max-w-2xl">
              These resources are being finalized. <Link href="/contact" className="text-[#006FB9] hover:text-[#FF6B00] underline">Send us a note</Link> and we&apos;ll get you a copy as soon as it&apos;s ready — or let us know if you have a specific use case worth tailoring for.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((r) => {
                const Icon = TYPE_ICONS[r.type];
                return (
                  <div key={r.title} className="bg-white rounded-xl p-6 border border-gray-100 opacity-90">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-[#F4F7FA] p-2 rounded-lg border border-gray-200 flex-shrink-0">
                        <Icon size={18} className="text-[#4E6575]" />
                      </div>
                      <div>
                        <span className="text-[#4E6575] text-xs uppercase tracking-wide font-semibold">{r.type}</span>
                        <h3 className="text-[#06284C] font-bold text-base mt-0.5">{r.title}</h3>
                      </div>
                    </div>
                    <p className="text-[#1F2933] text-sm leading-relaxed mb-4">{r.description}</p>
                    <p className="text-[#4E6575] text-xs uppercase tracking-wide mb-4">For: {r.audience}</p>
                    <Link href={r.href} className="text-[#006FB9] hover:text-[#FF6B00] text-sm font-semibold transition-colors">
                      Request early access →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Plain context */}
      <section className="bg-white section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#06284C] text-2xl font-bold mb-4">Why AES Publishes Templates</h2>
          <p className="text-[#1F2933] leading-relaxed mb-4">
            We publish RFP templates and checklists because the procurement side of infrastructure deployment is harder than it should be. Most teams writing a structured cabling, rack-and-stack, or AP refresh RFP are doing it for the first or second time in their career. The result is scope gaps, mismatched evaluation criteria, and bids that aren&apos;t comparable.
          </p>
          <p className="text-[#1F2933] leading-relaxed mb-4">
            A well-built RFP template doesn&apos;t favor any one vendor — it makes the comparison fair. That&apos;s good for buyers, and it&apos;s good for AES because we win on execution and documentation, not on procurement confusion.
          </p>
          <p className="text-[#1F2933] leading-relaxed">
            Use these as starting points. Edit them. Strip the AES branding if you need to. The goal is better-scoped projects, not free marketing for us.
          </p>
        </div>
      </section>

      <CtaBand heading="Have a scope ready to share?" />
    </>
  );
}
