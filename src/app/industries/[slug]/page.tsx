import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import ServiceCard from "@/components/service-card";
import { INDUSTRIES, SERVICES } from "@/lib/utils";

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ind = INDUSTRIES.find((i) => i.slug === params.slug);
  if (!ind) return {};
  return { title: ind.title };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = INDUSTRIES.find((i) => i.slug === params.slug);
  if (!ind) notFound();

  const relatedServices = SERVICES.filter((s) => (ind.services as readonly string[]).includes(s.slug));

  return (
    <>
      <PageHero
        eyebrow={ind.title}
        h1={ind.headline}
        sub={ind.sub}
        cta={{ label: "Request a Site Walk →", href: "/contact" }}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: ind.title, href: `/industries/${ind.slug}` }]}
      />
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#06284C] text-2xl font-bold mb-8">Relevant Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedServices.map((s) => <ServiceCard key={s.slug} {...s} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
