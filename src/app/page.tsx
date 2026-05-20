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
  description: "Apex Enterprise Solutions delivers structured cabling, rack-and-stack, and large-scale AP refresh across the U.S. & Canada. Field-first, certified, on schedule.",
  alternates: { canonical: "https://www.apexsolutions.io" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.apexsolutions.io/#business",
      name: "Apex Enterprise Solutions",
      url: "https://www.apexsolutions.io",
      logo: "https://www.apexsolutions.io/images/AES_Option3_Primary_Full_Logo_No_Background.png",
      image: "https://www.apexsolutions.io/images/hero-datacenter.png",
      description: "IT infrastructure deployment company specializing in structured cabling, rack-and-stack, and large-scale AP refresh across the U.S. and Canada.",
      telephone: "+16692517810",
      email: "info@apexsolutions.io",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1069 Duane Ct",
        addressLocality: "Sunnyvale",
        addressRegion: "CA",
        postalCode: "94085",
        addressCountry: "US",
      },
      areaServed: ["United States", "Canada"],
      sameAs: ["https://www.linkedin.com/company/apexenterprisesolutions/"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Infrastructure Deployment Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structured Cabling", url: "https://www.apexsolutions.io/services/structured-cabling" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rack & Stack", url: "https://www.apexsolutions.io/services/rack-and-stack" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AP Refresh", url: "https://www.apexsolutions.io/services/ap-refresh" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.apexsolutions.io/#website",
      url: "https://www.apexsolutions.io",
      name: "Apex Enterprise Solutions",
      publisher: { "@id": "https://www.apexsolutions.io/#business" },
    },
  ],
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
  { heading: "Speed",          body: "AES mobilizes fast — across the U.S. and Canada, for single sites and multi-city programs alike." },
  { heading: "Coordination",   body: "Daily field updates, proactive issue calls, and a team that doesn't wait to be chased." },
  { heading: "Workmanship",    body: "Installations that pass first inspection — cabling dressed clean, labeled right, documented before we leave site." },
  { heading: "Documentation",  body: "Test reports, as-builts, and label schemas in the format your client requires. Delivered at closeout, not three weeks later." },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-[#06284C] min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#4E6575] uppercase tracking-widest text-sm font-medium mb-6">
              Field Execution · U.S. &amp; Canada
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              North America&apos;s{" "}
              <span className="text-[#FF6B00]">Field Execution Partner</span>
            </h1>
            <p className="text-[#4E6575] text-lg md:text-xl leading-relaxed mb-4 max-w-xl">
              Structured cabling, rack-and-stack, and large-scale AP refresh —
              executed across the U.S. and Canada. AES delivers the field
              precision, disciplined documentation, and program coordination
              that primes and integrators stake their reputation on.
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

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow text-center mb-3">What Partners Say</p>
          <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold text-center mb-12">
            Trusted by Primes &amp; Integrators
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "AES showed up on day one, executed without hand-holding, and the documentation package was cleaner than what our own crews produce. We'd use them again without hesitation.",
                role: "Program Director",
                company: "Global E-Commerce Fulfillment Operator",
              },
              {
                quote: "We handed AES a 46-IDF, two-site AP rollout with a 24-hour change window. They held the window, zero safety incidents, and the coverage validation came back clean. Exactly what we needed.",
                role: "Senior Project Manager",
                company: "National Systems Integrator",
              },
              {
                quote: "The closeout pack was ready at handover — OTDR certs, as-builts, label schema, the whole thing. That's rare in field services. It made our client acceptance a non-event.",
                role: "Operations Lead",
                company: "Telecom Infrastructure Prime",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 border border-[#006FB9]/10 shadow-sm flex flex-col gap-5"
              >
                {/* Quote mark */}
                <span className="text-[#FF6B00] text-4xl font-black leading-none select-none">&ldquo;</span>
                <p className="text-[#1F2933] leading-relaxed text-base flex-1">{t.quote}</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[#06284C] font-semibold text-sm">{t.role}</p>
                  <p className="text-[#4E6575] text-xs mt-0.5">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* ── WHO WE HELP ──────────────────────────────────────── */}
      <section className="bg-[#0D1F3C] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#7A9FC0] uppercase tracking-widest text-sm font-light text-center mb-3">
            Who We Help
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-4">
            Built for the Teams Running the Program
          </h2>
          <p className="text-[#7A9FC0] text-center max-w-2xl mx-auto mb-14 text-base leading-relaxed">
            AES works as a subcontract execution partner — not a staffing agency, not a generalist IT firm.
            If your team is responsible for what happens in the field, we&apos;re built for you.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: "Primes & General Contractors",
                icon: (
                  <svg className="w-7 h-7 text-[#F26522]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                ),
                heading: "Multi-site programs need execution partners, not variables.",
                body: "You're managing scope, schedule, and client expectations across multiple locations. AES plugs in as a reliable subcontractor — credentialed field crew, clear communication, zero babysitting required.",
                fit: ["10+ location rollouts", "Data center builds", "Wireless deployments"],
              },
              {
                label: "Systems Integrators",
                icon: (
                  <svg className="w-7 h-7 text-[#F26522]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                ),
                heading: "Your brand is on the line. So is ours.",
                body: "Integrators stake their reputation on every subcontractor in the field. AES delivers to a standard that protects yours — clean installs, documented closeout, and a crew that represents your program professionally.",
                fit: ["Network refresh programs", "Cabling & fiber runs", "Rack-and-stack builds"],
              },
              {
                label: "Enterprise IT Teams",
                icon: (
                  <svg className="w-7 h-7 text-[#F26522]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3m-16.5 0a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3M6.75 6h10.5M6 9.75h.008v.008H6V9.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                ),
                heading: "You need the physical layer done right — on your timeline.",
                body: "Hardware refresh, AP rollouts, structured cabling across campus or data center — AES executes the field work so your internal team stays focused on system configuration, not pulling cable.",
                fit: ["Hardware refresh cycles", "Campus AP rollouts", "Data center migrations"],
              },
            ].map((persona) => (
              <div
                key={persona.label}
                className="bg-white/5 border border-white/10 hover:border-[#F26522]/40 rounded-xl p-8 flex flex-col gap-5 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F26522]/10 rounded-lg flex items-center justify-center">
                    {persona.icon}
                  </div>
                  <span className="text-[#7A9FC0] text-xs uppercase tracking-widest font-light leading-tight pt-1">
                    {persona.label}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg leading-snug">
                  {persona.heading}
                </h3>
                <p className="text-[#7A9FC0] text-sm leading-relaxed flex-1">
                  {persona.body}
                </p>
                <div className="border-t border-white/10 pt-4 space-y-1.5">
                  {persona.fit.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-[#7A9FC0]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F26522] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Tell Us About Your Program <ArrowRight size={16} />
            </Link>
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
            <Image
              src="/images/about-coverage-map.png"
              alt="AES field coverage map — active pods across the United States"
              width={900}
              height={520}
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

      {/* ── PARTNER VALUE ────────────────────────────────────── */}
      <section className="bg-[#06284C] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#4E6575] uppercase tracking-widest text-sm font-medium text-center mb-3">The AES Standard</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 text-center">
            What Primes and Integrators Get
          </h2>
          <p className="text-[#4E6575] text-center max-w-2xl mx-auto mb-12 text-base leading-relaxed">
            When a program goes to the field, execution quality is what the client remembers. AES delivers consistent, documented, professional field work — the kind that makes primes look good.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "01", heading: "Fast Mobilization", body: "AES deploys quickly — credentialed technicians, right coverage area, right scope. No warm-up time on urgent programs." },
              { icon: "02", heading: "Clear Communication", body: "Daily site reports, proactive escalation, and a single point of contact from kickoff to closeout. No surprises." },
              { icon: "03", heading: "Clean Installations", body: "Every install is done to a standard: properly routed, tested, labeled, and cleaned up before the crew leaves site." },
              { icon: "04", heading: "Handover-Ready Documentation", body: "As-builts, OTDR reports, RF validation, label schemas — delivered in the format your PM needs. Closeout that holds up." },
              { icon: "05", heading: "Program Execution at Scale", body: "Single site or 50-location rollout, the AES delivery standard doesn't change. We scale to the program." },
              { icon: "06", heading: "Safety by Default", body: "Full PPE compliance, site orientation, and documented safety practices on every engagement. Zero incidents isn't a target — it's the floor." },
            ].map((item) => (
              <div key={item.icon} className="bg-white/5 border border-white/10 rounded-xl p-7 flex flex-col gap-3">
                <span className="text-[#FF6B00] text-xs font-black tracking-widest">{item.icon}</span>
                <h3 className="text-white font-bold text-base">{item.heading}</h3>
                <p className="text-[#4E6575] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA BAND */}
      <CtaBand heading="Let's Talk About Your Next Program." />
    </>
  );
}
