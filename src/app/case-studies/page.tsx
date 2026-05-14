import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import CaseStudyCard from "@/components/case-study-card";
import CtaBand from "@/components/cta-band";
import { CASE_STUDIES } from "@/lib/utils";

export const metadata: Metadata = { title: "Deployments & Case Studies" };

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero h1="Deployments & Case Studies" sub="Real projects, real numbers. No estimates, no placeholders." />
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs) => <CaseStudyCard key={cs.slug} {...cs} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
