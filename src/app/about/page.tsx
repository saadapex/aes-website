import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = { title: "About Apex Enterprise Solutions" };

const PRINCIPLES = [
  {
    title: "Execution Partner, Not a Vendor",
    body: "We operate as a reliable extension of our partners' field teams — responsive, accountable, and focused on protecting schedule and quality.",
  },
  {
    title: "Field-First Culture",
    body: "Our work is measured by what happens on the floor: clean installs, labeled runs, validated test packs, and closeout documentation that holds up.",
  },
  {
    title: "Clear Communication",
    body: "No surprises. We surface issues early, communicate clearly, and keep our partners informed from kickoff through handover.",
  },
  {
    title: "Disciplined Documentation",
    body: "Closeout documentation is part of the job, not an afterthought. Every project ends with as-builts, test reports, and records that reduce rework.",
  },
];

const LEADERSHIP = [
  {
    initials: "SU",
    name: "Saad Usmani",
    title: "Founder & CEO",
    bio: "Leads business development, client relationships, partner engagement, pricing, and delivery oversight across AES operations.",
  },
  {
    initials: "VB",
    name: "Vinod Bharwani",
    title: "Chief Operating Officer",
    bio: "Supports operational coordination, execution planning, and field delivery across active project engagements.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AES"
        h1="A Field Execution Partner Built for Mission-Critical Infrastructure"
        sub="Apex Enterprise Solutions supports data center, fiber, cabling, wireless, and field execution work across North America."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
      />

      {/* Mission */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow mb-3">Who We Are</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-6">
              Dependable Delivery for Primes, Integrators, and Enterprise IT Teams
            </h2>
            <p className="text-[#1F2933] text-lg leading-relaxed mb-4">
              AES helps primes, integrators, and enterprise infrastructure teams execute data center
              and network deployment work with reliable field resources, clear coordination,
              and clean closeout documentation.
            </p>
            <p className="text-[#1F2933] leading-relaxed mb-6">
              We are a North America-based field execution partner — not a staffing agency, not a
              general contractor. We bring structured deployment processes, experienced technicians,
              and a bias toward clean, documented work that protects our partners.
            </p>
            <Link href="/contact" className="btn-primary">
              Work With AES →
            </Link>
          </div>
          <div className="space-y-6">
            {/* Field team photo */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-2">
              <Image
                src="/images/about-field-team.png"
                alt="AES field technicians coordinating on a deployment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/30 to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="bg-[#F4F7FA] rounded-lg p-5 border-l-4 border-[#FF6B00]">
                  <h3 className="text-[#06284C] font-bold mb-1">{p.title}</h3>
                  <p className="text-[#1F2933] text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Leadership</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-12">The Team Behind AES</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            {LEADERSHIP.map((person) => (
              <div key={person.name} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#06284C] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">{person.initials}</span>
                </div>
                <h3 className="text-[#06284C] font-bold text-xl mb-0.5">{person.name}</h3>
                <p className="text-[#FF6B00] text-sm font-semibold mb-3">{person.title}</p>
                <p className="text-[#1F2933] text-sm leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Coverage</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-4">North America Field Presence</h2>
          <p className="text-[#1F2933] text-lg mb-8 max-w-2xl">
            We mobilize where the work is. Active field pods across the U.S. and Canada, with
            rapid-response capability for multi-site and urgent deployment programs.
          </p>
          {/* Coverage map */}
          <div className="w-full rounded-xl overflow-hidden shadow-lg mb-8">
            <img
              src="/images/about-coverage-map.png"
              alt="AES field coverage map — active pods across the United States"
              className="w-full h-auto block"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {["Ontario, CA", "Bay Area, CA", "Dallas, TX", "Las Vegas, NV", "Memphis, TN"].map((pod) => (
              <span key={pod}
                className="bg-[#F4F7FA] border border-[#006FB9]/20 text-[#06284C] px-4 py-2 rounded-full text-sm font-medium">
                📍 {pod}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Ready to work with a dependable execution partner?" />
    </>
  );
}
