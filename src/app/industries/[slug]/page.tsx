import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import ServiceCard from "@/components/service-card";
import CaseStudyCard from "@/components/case-study-card";
import { INDUSTRIES, SERVICES, CASE_STUDIES } from "@/lib/utils";

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ind = INDUSTRIES.find((i) => i.slug === params.slug);
  if (!ind) return {};
  return {
    title: ind.title,
    description: `Apex Enterprise Solutions delivers structured cabling, rack-and-stack, and AP refresh for ${ind.title.toLowerCase()} environments across the U.S. and Canada. ${ind.sub}`,
    alternates: { canonical: `https://www.apexsolutions.io/industries/${params.slug}` },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = INDUSTRIES.find((i) => i.slug === params.slug);
  if (!ind) notFound();

  const relatedServices = SERVICES.filter((s) => (ind.services as readonly string[]).includes(s.slug));
  const featuredStudy = CASE_STUDIES.find((cs) => cs.slug === ind.caseStudySlug);

  // ──────────────────────────────────────────────────────────
  // JSON-LD schemas
  // ──────────────────────────────────────────────────────────
  const pageUrl = `https://www.apexsolutions.io/industries/${ind.slug}`;

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Apex Enterprise Solutions — ${ind.title}`,
    description: ind.sub,
    url: pageUrl,
    image: `https://www.apexsolutions.io${ind.image.src}`,
    parentOrganization: { "@type": "Organization", name: "Apex Enterprise Solutions", url: "https://www.apexsolutions.io" },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    serviceType: relatedServices.map((s) => s.title),
    telephone: "+1-669-251-7810",
    email: "info@apexsolutions.io",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ind.faq.map((item) => ({
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
      { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.apexsolutions.io/industries" },
      { "@type": "ListItem", position: 3, name: ind.title, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow={ind.title}
        h1={ind.headline}
        sub={ind.sub}
        cta={{ label: "Get a Quote →", href: "/contact" }}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: ind.title, href: `/industries/${ind.slug}` }]}
        image={ind.image}
      />

      {/* ── PAIN POINTS ─────────────────────────────────────────── */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">What Buyers in This Space Deal With</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-12">
            The Problems AES Is Built to Solve
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {ind.painPoints.map((pt) => (
              <div key={pt.heading} className="flex gap-5">
                <div className="flex-shrink-0 w-1 rounded-full bg-[#FF6B00] self-stretch" />
                <div>
                  <h3 className="text-[#06284C] font-bold text-lg mb-2">{pt.heading}</h3>
                  <p className="text-[#1F2933] leading-relaxed text-sm">{pt.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KPI BAND ─────────────────────────────────────────────── */}
      <section className="bg-[#06284C] py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {ind.kpis.map((kpi) => (
            <div key={kpi.label}>
              <div className="text-[#FF6B00] text-4xl md:text-5xl font-black mb-2">
                {kpi.value}
              </div>
              <div className="text-[#4E6575] text-sm uppercase tracking-wide">
                {kpi.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RELEVANT SERVICES ────────────────────────────────────── */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">What We Deploy</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-10">
            Services for {ind.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedServices.map((s) => <ServiceCard key={s.slug} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── RELATED CASE STUDY ───────────────────────────────────── */}
      {featuredStudy && (
        <section className="bg-white section-pad">
          <div className="max-w-7xl mx-auto">
            <p className="eyebrow mb-3">Proof of Work</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-10">
              A Recent Deployment in This Space
            </h2>
            <div className="max-w-xl">
              <CaseStudyCard {...featuredStudy} />
            </div>
            <div className="mt-8">
              <Link
                href="/case-studies"
                className="text-[#006FB9] font-semibold text-sm hover:text-[#FF6B00] transition-colors"
              >
                View All Deployments →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-[#F4F6F9] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Common Questions</p>
          <h2 className="text-[#0D1F3C] text-3xl font-bold mb-10">{ind.title} — FAQ</h2>
          <div className="max-w-3xl space-y-8">
            {ind.faq.map((item) => (
              <div key={item.q} className="border-b border-gray-200 pb-8 last:border-0">
                <h3 className="text-[#0D1F3C] text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-[#1F2933] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}