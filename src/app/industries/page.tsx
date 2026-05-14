import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { INDUSTRIES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "AES deploys infrastructure for data centers, logistics and warehousing, enterprise campuses, and telecom providers across the U.S. and Canada.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero h1="Industries We Serve" sub="From hyperscale data halls to frozen warehouse floors — AES delivers field-first infrastructure across every environment." />
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {INDUSTRIES.map((ind) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`}
              className="group bg-[#F4F7FA] hover:bg-white border border-transparent hover:border-[#FF6B00]/30 rounded-xl p-8 transition-all duration-200 hover:shadow-md">
              <h2 className="text-[#06284C] font-bold text-xl mb-2 group-hover:text-[#FF6B00] transition-colors">{ind.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{ind.sub}</p>
              <span className="text-[#006FB9] text-sm font-semibold group-hover:text-[#FF6B00] transition-colors">Learn More →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
