import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/service-card";
import CaseStudyCard from "@/components/case-study-card";
import CtaBand from "@/components/cta-band";
import { SITE, SERVICES, INDUSTRIES, CASE_STUDIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "IT Infrastructure & Data-Center Deployment | Apex Enterprise Solutions",
  description: "Apex Enterprise Solutions supports fiber, structured cabling, rack-and-stack, and AI/data center deployments across North America. Field-first, credentialed, on schedule.",
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
      description: "IT infrastructure deployment company supporting fiber, structured cabling, rack-and-stack, and AI/data center deployments across North America.",
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
      // Sunnyvale HQ coordinates — helps LLMs and Local Pack tie the entity to a city.
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.3852,
        longitude: -122.0089,
      },
      // Field execution is appointment-based across U.S. + Canada; office hours
      // here represent the AES coordination/sales window, not field availability.
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      priceRange: "$$",
      areaServed: ["United States", "Canada"],
      sameAs: [
        "https://www.linkedin.com/company/apexenterprisesolutions/",
        "https://x.com/apexensolutions",
        "https://www.instagram.com/apexenterprisesolutions",
        "https://www.facebook.com/apexenterprisesolutions",
      ],
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
  { heading: "Workmanship",    body: "Installations built for first-pass acceptance — cabling dressed clean, labeled right, documented before we leave site." },
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
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight mb-6">
              We support{" "}
              <span className="text-[#FF6B00]">
                Fiber, Structured Cabling, Rack-and-Stack &amp; AI/Data Center
                Deployments
              </span>{" "}
              across North America.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/contact" className="btn-primary text-base">
                Request a Site Walk <ArrowRight size={16} />
              </Link>
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

      {/* ── FROM THE FOUNDER ─────────────────────────────────── */}
      <section className="bg-[#06284C] section-pad relative overflow-hidden">
        {/* Subtle orange glow accent */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF6B00] opacity-10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-center relative">

          {/* Photo */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="relative w-56 h-56 lg:w-72 lg:h-72">
              <div className="absolute -inset-3 bg-[#FF6B00] opacity-20 blur-2xl rounded-full" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FF6B00]/40">
                <Image
                  src="/images/Saad Headshot.png"
                  alt="Saad Usmani, Founder &amp; CEO of Apex Enterprise Solutions"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="lg:col-span-3">
            <span className="text-[#FF6B00] text-5xl font-black leading-none select-none block mb-3">&ldquo;</span>
            <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-8">
              In two decades of telecom and field deployment, I watched the same pattern over and over &mdash; well-designed programs unraveled by subcontractors who couldn&apos;t be relied on. I started AES to break that pattern.
            </p>
            <div className="border-t border-white/15 pt-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-[#FF6B00] font-bold text-base">Saad Usmani</p>
                <p className="text-[#7A9FC0] text-sm">Founder &amp; CEO, Apex Enterprise Solutions</p>
              </div>
              <Link
                href="/about#founder-letter"
                className="text-white hover:text-[#FF6B00] text-sm font-semibold transition-colors"
              >
                Read the founder letter &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAND: PARTNER ECOSYSTEM LOGOS ──────────────── */}
      <section className="bg-white border-b border-gray-100 py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 items-center">
            {[
              { name: "HPE",                 logo: "/images/Partners%20Logo/HPE-Logo.png" },
              { name: "Black Box",           logo: "/images/Partners%20Logo/Blackbox-Logo.jpg" },
              { name: "DataKnox",            logo: "/images/Partners%20Logo/636bbbf913f59171dda12e5b_dataknox-blue.svg" },
              { name: "Eaton / Exertherm",   logo: "/images/Partners%20Logo/Exertherm%20logo.svg" },
              { name: "Karavan Technology",  logo: "/images/Partners%20Logo/Karavan.svg" },
              { name: "Inventiv Technology", logo: "/images/Partners%20Logo/INVENTIV-TECHNOLOGY-TRANSPARENT-PNG.png.webp" },
            ].map((p) => (
              <Link
                key={p.name}
                href="/partners"
                title={p.name}
                className="flex items-center justify-center h-14 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-12 max-w-[140px] w-auto h-auto object-contain"
                />
              </Link>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed">
            Logos represent project, partner, or team ecosystem experience. Relationships are project-based;
            logos are displayed for reference only and do not imply endorsement unless stated.
            <Link href="/partners" className="text-[#006FB9] hover:text-[#FF6B00] font-semibold ml-1">
              View all partners &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold text-center mb-12">
            Trusted by Primes &amp; Integrators
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "AES has been a dependable partner for our infrastructure deployment work. Saad and his team are responsive, organized, and focused on delivering quality execution in the field. I appreciate their professionalism and would recommend AES for IT infrastructure and data center deployment support.",
                name: "Omar Matar",
                role: "CEO",
                company: "Karavan Technology",
              },
              {
                quote: "Apex Enterprise Solutions has been a reliable and professional partner for our technology deployment needs. Their team brings strong technical capability, clear communication, and dependable field execution. We appreciate their responsiveness and commitment to getting the work done right.",
                name: "Asfar Zaidi",
                role: "CEO",
                company: "Inventiv Technology",
              },
              {
                quote: "I've seen Saad's professionalism, technical knowledge, and execution discipline first-hand. Through Apex Enterprise Solutions, he's built a company focused on reliable field execution and clear communication. I would recommend AES for IT infrastructure and data center deployment work.",
                name: "Vijay Kumar",
                role: "Service Delivery Executive",
                company: "",
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
                  {t.name ? (
                    <>
                      <p className="text-[#06284C] font-bold text-base">{t.name}</p>
                      <p className="text-[#4E6575] text-xs mt-0.5">{t.company ? `${t.role} · ${t.company}` : t.role}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[#06284C] font-semibold text-sm">{t.role}</p>
                      <p className="text-[#4E6575] text-xs mt-0.5">{t.company}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold max-w-xl">
              Core Services. One Execution Partner.
            </h2>
            <Link href="/services"
              className="text-[#006FB9] font-semibold text-sm hover:text-[#FF6B00] transition-colors hidden md:block">
              View All Services →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.filter((s) => s.slug !== "smart-hands").map((s) => (
              <ServiceCard key={s.slug} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ──────────────────────────────────────── */}
      <section className="bg-[#0D1F3C] section-pad">
        <div className="max-w-7xl mx-auto">
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
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-12 text-center">
            Industries We Deploy In
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
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
          <h2 className="text-[#06284C] text-3xl md:text-4xl font-bold mb-4">
            North America Coverage
          </h2>
          <p className="text-[#1F2933] text-lg mb-10 max-w-2xl mx-auto">
            Active field-resource coverage in key U.S. and Canadian markets, with additional mobilization on a project basis.
          </p>
          <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8">
            <Image
              src="/images/about-coverage-map.png"
              alt="AES field coverage map — active markets across the U.S. and Canada"
              width={900}
              height={520}
              className="w-full h-auto block brightness-150"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["San Francisco Bay Area, CA", "Los Angeles, CA", "Dallas, TX", "Las Vegas, NV", "Memphis, TN", "Toronto, ON", "Calgary, AB", "Edmonton, AB"].map((pod) => (
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
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 text-center">
            What Primes and Integrators Get
          </h2>
          <p className="text-[#4E6575] text-center max-w-2xl mx-auto mb-12 text-base leading-relaxed">
            When a program goes to the field, execution quality is what the client remembers. AES delivers consistent, documented, professional field work — the kind that makes primes look good.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: "01", heading: "Fast Mobilization & Clear Communication", body: "AES deploys quickly with credentialed technicians, daily site reports, proactive escalation, and a single point of contact from kickoff to closeout." },
              { icon: "02", heading: "Clean Installs & Handover-Ready Documentation", body: "Properly routed, tested, labeled work — paired with as-builts, OTDR reports, RF validation, and label schemas delivered in the format your PM needs." },
              { icon: "03", heading: "Program Execution at Scale", body: "Single-site or multi-location rollout, AES applies the same field execution standard. We scale to the program." },
              { icon: "04", heading: "Safety by Default", body: "Safe execution planned into every engagement — PPE compliance, site orientation, lift discipline, and documented safety practices." },
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
