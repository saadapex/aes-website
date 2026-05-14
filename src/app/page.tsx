import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import StatsBand from "@/components/stats-band";
import LogoSlider from "@/components/logo-slider";
import ServiceCard from "@/components/service-card";
import CaseStudyCard from "@/components/case-study-card";
import CtaBand from "@/components/cta-band";
import { SITE, SERVICES, INDUSTRIES, CASE_STUDIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "IT Infrastructure & Data-Center Deployment | Apex Enterprise Solutions",
};

const STEPS = [
  {
    num: "01",
    title: "Scope & Plan",
    body: "Site walk, BOM, method statements, risk and lift plans. Clear coordination before a single cable is pulled.",
  },
  {
    num: "02",
    title: "Build & Certify",
    body: "Cable and fiber runs, rack and power, AP mount and validate, OTDR certification. Clean installs with disciplined documentation.",
  },
  {
    num: "03",
    title: "Cutover & Handover",
    body: "Test packs, redlines, as-builts, CMDB updates, warranty. Closeout documentation that helps partners prove completion.",
  },
];

const VALUE_PILLARS = [
  { heading: "Speed",          body: "Fast mobilization for multi-site and urgent deployment needs." },
  { heading: "Coordination",   body: "Clear handoff, responsive communication, and field-aware planning." },
  { heading: "Workmanship",    body: "Technicians focused on clean installs, labeling, testing, and quality." },
  { heading: "Documentation",  body: "Closeout support that helps partners prove completion and reduce rework." },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-[#06284C] min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#4E6575] uppercase tracking-widest text-sm font-medium mb-6">
              Execution Partner · U.S. &amp; Canada
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Mission-Critical IT Infrastructure —{" "}
              <span className="text-[#FF6B00]">Deployed on Time. On Spec.</span>
            </h1>
            <p className="text-[#4E6575] text-lg md:text-xl leading-relaxed mb-4 max-w-xl">
              Structured cabling, rack-and-stack, and large-scale AP rollouts
              across the U.S. and Canada. Reliable field teams. Clean handoff.
              Closeout documentation that protects your schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/contact" className="btn-primary text-base">
                Request a Site Walk <ArrowRight size={16} />
              </Link>
              <a href={SITE.capabilityPdf} target="_blank" rel="noopener noreferrer"
                className="btn-outline-white text-base">
                Download Capability PDF
              </a>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-datacenter.png"
                alt="Data center rack deployment by Apex Enterprise Solutions"
                fill
                className="object-cover"
                priority
              />
              {/* Navy gradient overlay at bottom for polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <StatsBand />

      {/* ── PARTNER LOGO SLIDER ──────────────────────────────── */}
      <LogoSlider />

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">What We Deploy</p>
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold max-w-xl">
              Three Services. One Execution Partner.
            </h2>
            <Link href="/services"
              className="text-[#006FB9] font-semibold text-sm hover:text-[#FF6B00] transition-colors hidden md:block">
              View All Services →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE DELIVER ───────────────────────────────────── */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow text-center mb-3">Our Process</p>
          <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold mb-16 text-center">
            Structured Deployment, Every Time
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-[#006FB9]/15 text-8xl font-black absolute -top-4 -left-2 select-none leading-none">
                  {step.num}
                </div>
                <div className="relative pt-8 border-t-2 border-[#FF6B00]">
                  <h3 className="text-[#06284C] font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-[#1F2933] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PILLARS ─────────────────────────────────────── */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Why AES</p>
          <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold mb-12">
            What Partners Count On
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PILLARS.map((p) => (
              <div key={p.heading}
                className="bg-[#F4F7FA] rounded-lg p-6 border border-[#006FB9]/10 hover:border-[#FF6B00]/30 transition-colors">
                <div className="w-8 h-1 bg-[#FF6B00] mb-4 rounded-full" />
                <h3 className="text-[#06284C] font-bold text-lg mb-2">{p.heading}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CASE STUDIES ────────────────────────────── */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="eyebrow mb-2">Proof of Work</p>
              <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold">Recent Deployments</h2>
            </div>
            <Link href="/case-studies"
              className="text-[#006FB9] font-semibold text-sm hover:text-[#FF6B00] transition-colors hidden md:block">
              View All Deployments →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {CASE_STUDIES.slice(0, 2).map((cs) => (
              <CaseStudyCard key={cs.slug} {...cs} />
            ))}
          </div>
          <Link href="/case-studies"
            className="text-[#006FB9] font-semibold text-sm hover:text-[#FF6B00] transition-colors md:hidden block text-center">
            View All Deployments →
          </Link>
        </div>
      </section>

      {/* ── INDUSTRIES BAND ──────────────────────────────────── */}
      <section className="bg-[#06284C] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#4E6575] uppercase tracking-widest text-sm font-medium text-center mb-3">
            Sectors We Serve
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-12 text-center">
            Industries We Deploy In
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`}
                className="group bg-white/5 hover:bg-[#FF6B00]/10 border border-white/10 hover:border-[#FF6B00]/40
                           rounded-lg p-6 text-center transition-all duration-200">
                <p className="text-white font-semibold text-sm group-hover:text-[#FF6B00] transition-colors leading-tight">
                  {ind.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COVERAGE ─────────────────────────────────────────── */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto text-center">
          <p className="eyebrow mb-3">Field Coverage</p>
          <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold mb-4">
            North America Coverage
          </h2>
          <p className="text-[#1F2933] text-lg mb-10 max-w-2xl mx-auto">
            Rapid-response field pods across the U.S. and Canada. We mobilize where the work is.
          </p>
          <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8">
            <img
              src="/images/about-coverage-map.png"
              alt="AES field coverage map — active pods across the United States"
              className="w-full h-auto block"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["Ontario, CA", "Bay Area, CA", "Dallas, TX", "Las Vegas, NV", "Memphis, TN"].map((pod) => (
              <span key={pod}
                className="bg-[#F4F7FA] border border-[#006FB9]/20 text-[#06284C] text-sm px-4 py-2 rounded-full font-medium">
                📍 {pod}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-[#06284C] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#4E6575] uppercase tracking-widest text-sm font-medium text-center mb-3">What Partners Say</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-12 text-center">
            Trusted by Primes &amp; Integrators
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "AES mobilized quickly, kept us informed throughout, and handed over clean documentation. Exactly what we needed from a field execution partner.",
                name: "Senior Project Manager",
                company: "National Systems Integrator",
                service: "Rack & Stack",
              },
              {
                quote: "The AP rollout across our distribution centers came in on schedule with zero unplanned downtime. The standardized playbook made multi-site coordination seamless.",
                name: "Director of IT Infrastructure",
                company: "Fortune 500 Logistics Company",
                service: "AP Refresh",
              },
              {
                quote: "Their cabling team is meticulous — every run labeled, every test certified, closeout pack ready at handover. We've made AES our go-to sub for structured cabling.",
                name: "VP of Delivery",
                company: "Tier-1 Telecom Integrator",
                service: "Structured Cabling",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col">
                <div className="text-[#FF6B00] text-3xl font-serif leading-none mb-4">"</div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">{t.quote}</p>
                <div>
                  <span className="inline-block bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {t.service}
                  </span>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#4E6575] text-xs">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────── */}
      <CtaBand />
    </>
  );
}
