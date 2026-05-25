// v2
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About Apex Enterprise Solutions",
  description: "Learn how Apex Enterprise Solutions operates as a field-first infrastructure deployment partner across the U.S. and Canada. Structured cabling, rack-and-stack, and AP refresh.",
  alternates: { canonical: "https://www.apexsolutions.io/about" },
};

const PRINCIPLES = [
  {
    title: "Execution Partner, Not a Vendor",
    body: "AES brings its own processes, its own standards, and its own accountability to every engagement \u2014 not just bodies to fill a headcount.",
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
    photo: "/images/Saad Headshot.png",
    initials: "SU",
    name: "Saad Usmani",
    title: "Founder & CEO",
    bio: "Saad founded Apex Enterprise Solutions after more than two decades in telecom, infrastructure deployment, systems engineering, and technical program management — where he repeatedly saw large deployment programs fail at the field execution layer. He leads business development, partner relationships, pricing, and delivery oversight at AES, with a focus on building a company that protects its partners' reputations on every job.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AES"
        h1="North America&#x27;s Infrastructure Execution Partner"
        sub="Apex Enterprise Solutions executes structured cabling, rack-and-stack, and large-scale wireless rollouts across the U.S. and Canada \u2014 built clean, documented right, every time."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
      />

      {/* Mission */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow mb-3">Who We Are</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-6">
              The Execution Partner Primes and Integrators Count On
            </h2>
            <p className="text-[#1F2933] text-lg leading-relaxed mb-4">
              AES executes data center and network deployment programs for primes, integrators,
              and enterprise infrastructure teams \u2014 with experienced field resources, tight
              coordination, and closeout documentation that holds up to client scrutiny.
            </p>
            <p className="text-[#1F2933] leading-relaxed mb-6">
              We are a North America-based field execution partner. We bring structured deployment
              processes, credentialed technicians, and a standard of work that protects our
              partners&apos; reputations on every engagement.
            </p>
            <Link href="/contact" className="btn-primary">
              Work With AES &rarr;
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

      {/* Founder Letter */}
      <section id="founder-letter" className="bg-[#F4F6F9] section-pad scroll-mt-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* Letter — left column */}
          <div>
            <p className="eyebrow mb-3">A Letter from the Founder</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-8">Why I Started AES</h2>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-[#1E5FA8]/20" />
              <div className="space-y-10 pl-12">
                {[
                  {
                    year: "The Problem",
                    heading: "A gap that kept showing up",
                    body: "Coming from more than two decades in telecom, systems engineering, and technical program management, I kept running into the same situation on large programs — primes and integrators with strong design and PM capability, but no reliable field execution partner they could actually trust. Work was getting handed off to whoever was available, not whoever was qualified. Documentation was an afterthought. And the client always felt it.",
                  },
                  {
                    year: "The Decision",
                    heading: "Built for execution — nothing else",
                    body: "I started AES to fill that gap. Not as a staffing company, not as a generalist IT firm — but as a dedicated field execution partner with its own processes, its own standards, and its own accountability. A company that shows up prepared, executes clean, and hands over documentation that holds up. One where the quality of the work protects our partners, every time.",
                  },
                  {
                    year: "Today",
                    heading: "A team and a standard",
                    body: "AES now operates across the U.S. and Canada with a network of trusted field resources and a delivery model built around program-grade execution. Every technician on an AES engagement works to the same standard — because our partners' reputations depend on it. If you're sizing us up as a subcontract partner, that's the standard we hold ourselves to. Hold us to it.",
                  },
                ].map((item) => (
                  <div key={item.year} className="relative">
                    <div className="absolute -left-12 top-1 w-4 h-4 rounded-full bg-[#F26522] border-4 border-[#F4F6F9]" />
                    <p className="text-[#F26522] text-xs font-black uppercase tracking-widest mb-1">
                      {item.year}
                    </p>
                    <h3 className="text-[#0D1F3C] font-bold text-lg mb-2">{item.heading}</h3>
                    <p className="text-[#1F2933] text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature */}
            <div className="mt-12 pl-12 border-t border-[#1E5FA8]/15 pt-6">
              <p className="text-[#06284C] font-bold text-base mb-0.5" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}>
                Saad Usmani
              </p>
              <p className="text-[#4E6575] text-xs uppercase tracking-wide">Founder &amp; CEO, Apex Enterprise Solutions</p>
            </div>
          </div>

          {/* Pull quote + stats — right column */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            <div className="bg-[#0D1F3C] rounded-2xl p-10 shadow-xl">
              <span className="text-[#F26522] text-5xl font-black leading-none select-none block mb-4">&ldquo;</span>
              <p className="text-white text-xl md:text-2xl font-bold leading-snug mb-6">
                In two decades of telecom and field deployment, I watched the same pattern over and over &mdash; well-designed programs unraveled by subcontractors who couldn&apos;t be relied on. I started AES to break that pattern.
              </p>
              <div className="border-t border-white/10 pt-5">
                <p className="text-[#F26522] font-semibold text-sm">Saad Usmani</p>
                <p className="text-[#7A9FC0] text-xs mt-0.5">Founder &amp; CEO, Apex Enterprise Solutions</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-[#1E5FA8]/10 text-center shadow-sm">
                <p className="text-[#F26522] text-3xl font-black mb-1">U.S. &amp; CA</p>
                <p className="text-[#0D1F3C] text-xs uppercase tracking-wide font-medium">Active Coverage</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#1E5FA8]/10 text-center shadow-sm">
                <p className="text-[#F26522] text-3xl font-black mb-1">0</p>
                <p className="text-[#0D1F3C] text-xs uppercase tracking-wide font-medium">Recorded Safety Incidents<br/><span className="text-[10px] normal-case tracking-normal text-[#4E6575]">Documented AES-Led Engagements</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-[#F4F7FA] section-pad scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Leadership</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-12">The Team Behind AES</h2>
          <div className="max-w-3xl">
            {LEADERSHIP.map((person) => (
              <div key={person.name} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                {person.photo ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-[#06284C] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-3xl">{person.initials}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#06284C] font-bold text-xl mb-0.5">{person.name}</h3>
                  <p className="text-[#FF6B00] text-sm font-semibold mb-3">{person.title}</p>
                  <p className="text-[#1F2933] text-sm leading-relaxed">{person.bio}</p>
                </div>
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
            <Image
              src="/images/about-coverage-map.png"
              alt="AES field coverage map \u2014 active pods across the United States"
              width={1200}
              height={650}
              className="w-full h-auto block brightness-150"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {["San Francisco Bay Area, CA", "Los Angeles, CA", "Dallas, TX", "Las Vegas, NV", "Memphis, TN"].map((pod) => (
              <span key={pod}
                className="bg-[#F4F7FA] border border-[#006FB9]/20 text-[#06284C] px-4 py-2 rounded-full text-sm font-medium">
                &#128205; {pod}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="If it needs to be built right, AES will build it." />
    </>
  );
}
