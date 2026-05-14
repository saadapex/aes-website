import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers — Join the AES Field Team",
  description: "Join Apex Enterprise Solutions as a field technician or project coordinator. We deploy structured cabling, rack-and-stack, and wireless infrastructure across North America.",
};

const WHY = [
  {
    heading: "Field-First Culture",
    body: "We built AES around the people who actually do the work. Technicians, leads, and PMs are respected partners — not afterthoughts.",
  },
  {
    heading: "Diverse Project Mix",
    body: "One week you're in a hyperscale data center, the next you're rolling out Wi-Fi in a million-square-foot warehouse. Never the same job twice.",
  },
  {
    heading: "Clear Expectations",
    body: "Scope is defined before boots hit the floor. You know what's needed, what success looks like, and who to call if something changes.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        h1="Build Infrastructure with a Team That Knows the Field"
        sub="We're always looking for experienced technicians, field leads, and project managers across the U.S. and Canada."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }]}
      />

      {/* Why AES */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#06284C] text-3xl font-bold mb-12">Why Work With AES?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {WHY.map((item) => (
              <div key={item.heading} className="border-t-4 border-[#006FB9] pt-6">
                <h3 className="text-[#06284C] font-bold text-xl mb-3">{item.heading}</h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles we look for */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-[#06284C] text-3xl font-bold mb-6">Roles We Hire For</h2>
            <ul className="space-y-3">
              {[
                "Structured Cabling Technicians (Cat6 / Fiber)",
                "Data Center Rack & Stack Technicians",
                "Wireless AP Installation Technicians",
                "Field Leads & Site Supervisors",
                "Project Managers (Infrastructure)",
                "Low-Voltage Subcontractors & Field Partners",
              ].map((role) => (
                <li key={role} className="flex items-start gap-3 text-gray-700">
                  <span className="text-[#FF6B00] font-bold mt-0.5 flex-shrink-0">›</span>
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#06284C] rounded-xl p-8">
            <h3 className="text-white font-bold text-xl mb-2">Don&apos;t see your role listed?</h3>
            <p className="text-[#4E6575] mb-6 leading-relaxed">
              We work with a flexible network of trusted technicians. If you&apos;re certified,
              experienced, and dependable — we want to hear from you.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Field Technician Application`}
              className="btn-primary w-full justify-center"
            >
              Send Your Resume →
            </a>
          </div>
        </div>
      </section>

      {/* Open listings placeholder */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[#06284C] text-2xl font-bold mb-4">Open Positions</h2>
          <p className="text-gray-500 mb-8">
            We post active openings as projects come in. Check back, or send us a note directly.
          </p>
          <div className="border border-dashed border-[#006FB9]/30 rounded-xl p-12 max-w-2xl mx-auto">
            <p className="text-[#4E6575] mb-6">No open listings at the moment — but we&apos;re always building the bench.</p>
            <Link href="/contact" className="btn-secondary">
              Get In Touch →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand heading="Ready to build infrastructure that matters?" />
    </>
  );
}
