import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { FileText, Download } from "lucide-react";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources — RFP Template, Capability Statement & Buyer Guides",
  description:
    "Downloadable resources from AES — structured cabling RFP template, capability statement, and buyer guides for primes, integrators, and enterprise IT teams.",
  alternates: { canonical: "https://www.apexsolutions.io/resources" },
};

interface Resource {
  title: string;
  type: "Template" | "Statement";
  description: string;
  pages?: string;
  audience: string;
  // For gated lead magnets, link to the landing page (/resources/<slug>).
  // For direct downloads, link straight to the PDF in /assets/.
  href: string;
  cta: string;
  gated: boolean;
}

const RESOURCES: Resource[] = [
  {
    title: "Structured Cabling RFP Template",
    type: "Template",
    description:
      "Editable 22-page RFP template covering scope, technical specs, deliverables, schedule, pricing, qualifications, and evaluation criteria. Pre-built to procurement standards — drop in your project details and send it out.",
    pages: "22 pages · Interactive form fields",
    audience: "Primes · Integrators · Enterprise IT",
    href: "/resources/rfp-template",
    cta: "Get the Template",
    gated: true,
  },
  {
    title: "AES Capability Statement",
    type: "Statement",
    description:
      "One-page summary of AES services, coverage, delivery model, and engagement model. Built to share with procurement, finance, or anyone sizing up AES as a deployment partner.",
    audience: "Procurement · Primes · Integrators",
    href: SITE.capabilityPdf,
    cta: "Download PDF",
    gated: false,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        h1="Templates &amp; Capability Materials"
        sub="Practical, field-tested resources for primes, integrators, enterprise IT teams, and anyone scoping infrastructure deployment work."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Available Now</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-10">Download &amp; Use</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {RESOURCES.map((r) => (
              <div key={r.title} className="bg-[#F4F7FA] rounded-xl p-7 border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg border border-[#006FB9]/20 flex-shrink-0">
                    <FileText size={22} className="text-[#FF6B00]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#006FB9] text-xs uppercase tracking-wide font-semibold">{r.type}</span>
                    <h3 className="text-[#06284C] font-bold text-lg mt-1">{r.title}</h3>
                    {r.pages && <p className="text-[#4E6575] text-xs mt-0.5">{r.pages}</p>}
                  </div>
                </div>
                <p className="text-[#1F2933] text-sm leading-relaxed mb-4 flex-grow">{r.description}</p>
                <p className="text-[#4E6575] text-xs uppercase tracking-wide mb-5">For: {r.audience}</p>
                {r.gated ? (
                  <Link href={r.href} className="btn-primary inline-flex items-center gap-2 text-sm self-start">
                    <Download size={14} /> {r.cta} &rarr;
                  </Link>
                ) : (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 text-sm self-start"
                  >
                    <Download size={14} /> {r.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we publish */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#06284C] text-2xl font-bold mb-4">Why AES Publishes Templates</h2>
          <p className="text-[#1F2933] leading-relaxed mb-4">
            We publish RFP templates because the procurement side of infrastructure deployment is harder than it should be. Most teams writing a structured cabling, rack-and-stack, or AP refresh RFP are doing it for the first or second time in their career. The result is scope gaps, mismatched evaluation criteria, and bids that aren&apos;t comparable.
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
