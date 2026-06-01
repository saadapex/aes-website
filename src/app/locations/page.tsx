import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Locations — AES Field Coverage Across the U.S. and Canada",
  description:
    "Apex Enterprise Solutions delivers structured cabling, rack-and-stack, AP refresh, and smart hands across active coverage markets in the U.S. and Canada — Bay Area, LA, Dallas, Las Vegas, Memphis, Toronto / GTA, Calgary, and Edmonton.",
  alternates: { canonical: "https://www.apexsolutions.io/locations" },
};

export default function LocationsIndexPage() {
  const usLocations = LOCATIONS.filter((l) => l.country === "US");
  const caLocations = LOCATIONS.filter((l) => l.country === "CA");

  return (
    <>
      <PageHero
        eyebrow="Locations"
        h1="AES Field Coverage Across the U.S. &amp; Canada"
        sub="Active deployment markets where AES has executed projects. Additional cities supported on a project basis through our vetted partner and field-resource network."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
        ]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* U.S. coverage */}
          <div>
            <h2 className="text-[#06284C] text-3xl font-bold mb-10">U.S. Coverage</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usLocations.map((loc) => (
                <LocationCard key={loc.slug} loc={loc} />
              ))}
            </div>
          </div>

          {/* Canada coverage */}
          <div>
            <h2 className="text-[#06284C] text-3xl font-bold mb-10">Canadian Coverage</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caLocations.map((loc) => (
                <LocationCard key={loc.slug} loc={loc} />
              ))}
            </div>
          </div>

          {/* Don't see your market */}
          <div className="bg-[#F4F7FA] rounded-xl p-8 border border-gray-100">
            <h3 className="text-[#06284C] text-xl font-bold mb-3">Don&apos;t see your market?</h3>
            <p className="text-[#1F2933] leading-relaxed mb-5">
              AES supports additional U.S. and Canadian markets on a project basis through our vetted partner and field-resource network. If your project sits outside our active coverage list, send us the scope and we&apos;ll be straight about what we can mobilize.
            </p>
            <Link href="/contact" className="btn-primary">Send Your Scope →</Link>
          </div>

          {/* Freshness stamp for AI engine citation */}
          <p className="text-xs text-[#4E6575] text-right">
            Updated <time dateTime="2026-05-25">May 2026</time>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

/* ── Single reusable card ─────────────────────────────────────────── */
interface CardProps {
  loc: (typeof LOCATIONS)[number];
}

function LocationCard({ loc }: CardProps) {
  return (
    <div
      id={loc.slug}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group scroll-mt-28"
    >
      {/* Landmark image */}
      <div className="aspect-[4/3] bg-[#06284C] relative overflow-hidden">
        <Image
          src={loc.landmarkImage}
          alt={loc.landmarkAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle navy gradient at bottom for legibility if region badge sits on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/60 via-transparent to-transparent" />
        {/* Region badge */}
        <span className="absolute bottom-4 left-4 bg-[#FF6B00] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wide">
          {loc.region}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-[#06284C] font-bold text-xl mb-3">{loc.city}</h3>
        <p className="text-[#1F2933] text-sm leading-relaxed">{loc.cardSummary}</p>
      </div>
    </div>
  );
}
