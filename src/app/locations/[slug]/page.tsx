import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import CaseStudyCard from "@/components/case-study-card";
import { LOCATIONS } from "@/lib/locations";
import { SERVICES, CASE_STUDIES } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return {};
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `https://www.apexsolutions.io/locations/${loc.slug}` },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) notFound();

  const featuredCase = loc.caseStudySlug
    ? CASE_STUDIES.find((c) => c.slug === loc.caseStudySlug)
    : undefined;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Apex Enterprise Solutions — ${loc.city}`,
    description: loc.metaDescription,
    url: `https://www.apexsolutions.io/locations/${loc.slug}`,
    parentOrganization: { "@type": "Organization", name: "Apex Enterprise Solutions", url: "https://www.apexsolutions.io" },
    areaServed: {
      "@type": "Place",
      name: `${loc.city}, ${loc.region}`,
    },
    serviceType: ["Structured Cabling", "Rack and Stack", "AP Refresh", "Smart Hands and Field Support"],
    telephone: "+1-669-251-7810",
    email: "info@apexsolutions.io",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.apexsolutions.io/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.apexsolutions.io/locations" },
      { "@type": "ListItem", position: 3, name: loc.city, item: `https://www.apexsolutions.io/locations/${loc.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow={`${loc.region} · Field Coverage`}
        h1={loc.heroH1}
        sub={loc.heroSub}
        cta={{ label: "Send Your Scope →", href: "/contact" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: loc.city, href: `/locations/${loc.slug}` },
        ]}
      />

      {/* Services emphasized in this market */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Services in {loc.city}</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-10">What AES Delivers Here</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loc.servicesEmphasized.map((serviceSlug) => {
              const svc = SERVICES.find((s) => s.slug === serviceSlug);
              if (!svc) return null;
              return (
                <Link key={serviceSlug} href={`/services/${serviceSlug}`}
                  className="block bg-[#F4F7FA] rounded-xl p-6 hover:bg-[#06284C] hover:text-white border border-gray-100 transition-all group">
                  <h3 className="text-[#06284C] group-hover:text-white font-bold text-lg mb-2 transition-colors">{svc.title}</h3>
                  <p className="text-[#4E6575] group-hover:text-gray-300 text-xs uppercase tracking-wide mb-3 transition-colors">{svc.subtitle}</p>
                  <p className="text-[#1F2933] group-hover:text-gray-200 text-sm leading-relaxed transition-colors">{svc.subhead}</p>
                  <p className="text-[#006FB9] group-hover:text-[#FF6B00] text-sm font-semibold mt-4 transition-colors">View service →</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common site types in this market */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Common Project Environments</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-10">Where We Work in {loc.city}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {loc.siteTypes.map((t) => (
              <div key={t.heading} className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm">
                <h3 className="text-[#06284C] font-bold text-lg mb-3">{t.heading}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why field execution matters here */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Local Field Discipline</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-10">Why Field Execution in {loc.city} Is Its Own Game</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {loc.whyHere.map((w) => (
              <div key={w.heading} className="bg-[#F4F7FA] rounded-xl p-7 border border-gray-100">
                <h3 className="text-[#06284C] font-bold text-lg mb-3">{w.heading}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case study */}
      {featuredCase && (
        <section className="bg-[#F4F7FA] section-pad">
          <div className="max-w-7xl mx-auto">
            <p className="eyebrow mb-3">Proof of Work</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-10">Recent Deployment Near {loc.city}</h2>
            <div className="max-w-xl">
              <CaseStudyCard {...featuredCase} />
            </div>
          </div>
        </section>
      )}

      {/* Nearby coverage */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Nearby Coverage</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-8">Other Cities AES Supports Near {loc.city}</h2>
          <div className="flex flex-wrap gap-3">
            {loc.nearbyCoverage.map((city) => (
              <span key={city} className="bg-[#F4F7FA] border border-[#006FB9]/20 text-[#06284C] px-4 py-2 rounded-full text-sm font-medium">
                {city}
              </span>
            ))}
          </div>
          <p className="text-[#4E6575] text-sm mt-6 max-w-3xl">
            Additional cities and project sites supported on a project basis. <Link href="/contact" className="text-[#006FB9] hover:text-[#FF6B00] underline">Send your scope</Link> and we&apos;ll be straight about what we can mobilize for your timeline.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Common Questions</p>
          <h2 className="text-[#0D1F3C] text-3xl font-bold mb-10">{loc.city} — FAQ</h2>
          <div className="max-w-3xl space-y-8">
            {loc.faq.map((item) => (
              <div key={item.q} className="border-b border-gray-200 pb-8 last:border-0">
                <h3 className="text-[#0D1F3C] text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-[#1F2933] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading={`Have a project in ${loc.city}?`} />
    </>
  );
}
