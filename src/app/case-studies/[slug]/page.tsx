import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { CASE_STUDIES } from "@/lib/utils";

const IMAGES: Record<string, string> = {
  "ai-cluster-pod-build": "/images/case-ai-cluster.png",
  "warehouse-ap-refresh":  "/images/case-warehouse-ap.png",
  "amazon-ap-refresh":     "/images/case-amazon-ap.png",
};

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug);
  return cs ? { title: cs.title } : {};
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  return (
    <>
      <PageHero
        eyebrow={cs.tag}
        h1={cs.title}
        sub={cs.location}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.title, href: `/case-studies/${cs.slug}` },
        ]}
      />

      {/* Hero image */}
      {IMAGES[cs.slug] && (
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <Image
            src={IMAGES[cs.slug]}
            alt={cs.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06284C]/30 to-[#06284C]/10" />
        </div>
      )}

      {/* Metrics band */}
      <section className="bg-[#06284C] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {cs.metrics.map((metric) => (
            <div key={metric}>
              <p className="text-[#FF6B00] text-2xl font-black mb-1">{metric}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Copy placeholder */}
      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4E6575] italic">[Full case study copy — add when approved]</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
