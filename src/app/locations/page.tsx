import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Locations — AES Field Coverage Across the U.S. and Canada",
  description:
    "Apex Enterprise Solutions delivers structured cabling, rack-and-stack, AP refresh, and smart hands across active field coverage markets in the U.S. and Canada — Bay Area, LA, Dallas, Las Vegas, Toronto, and more.",
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
        sub="Active deployment markets where AES has executed projects, sized to local field discipline. Additional cities supported on a project basis."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
        ]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto space-y-16">
          <div>
            <p className="eyebrow mb-3">United States</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-10">U.S. Coverage</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usLocations.map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.slug}`}
                  className="block bg-[#F4F7FA] rounded-xl p-7 hover:bg-[#06284C] border border-gray-100 transition-all group">
                  <p className="text-[#4E6575] group-hover:text-gray-300 text-xs uppercase tracking-wide mb-2 transition-colors">{loc.region}</p>
                  <h3 className="text-[#06284C] group-hover:text-white text-xl font-bold mb-3 transition-colors">{loc.city}</h3>
                  <p className="text-[#1F2933] group-hover:text-gray-200 text-sm leading-relaxed mb-4 transition-colors">{loc.cardSummary}</p>
                  <p className="text-[#006FB9] group-hover:text-[#FF6B00] text-sm font-semibold transition-colors">View {loc.city} coverage →</p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-3">Canada</p>
            <h2 className="text-[#06284C] text-3xl font-bold mb-10">Canadian Coverage</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caLocations.map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.slug}`}
                  className="block bg-[#F4F7FA] rounded-xl p-7 hover:bg-[#06284C] border border-gray-100 transition-all group">
                  <p className="text-[#4E6575] group-hover:text-gray-300 text-xs uppercase tracking-wide mb-2 transition-colors">{loc.region}</p>
                  <h3 className="text-[#06284C] group-hover:text-white text-xl font-bold mb-3 transition-colors">{loc.city}</h3>
                  <p className="text-[#1F2933] group-hover:text-gray-200 text-sm leading-relaxed mb-4 transition-colors">{loc.cardSummary}</p>
                  <p className="text-[#006FB9] group-hover:text-[#FF6B00] text-sm font-semibold transition-colors">View {loc.city} coverage →</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#F4F7FA] rounded-xl p-8 border border-gray-100">
            <h3 className="text-[#06284C] text-xl font-bold mb-3">Don&apos;t see your market?</h3>
            <p className="text-[#1F2933] leading-relaxed mb-5">
              AES supports additional U.S. and Canadian markets on a project basis through a vetted partner and field-resource network. If your project sits outside our active coverage list, send us the scope and we&apos;ll be straight about what we can mobilize.
            </p>
            <Link href="/contact" className="btn-primary">Send Your Scope →</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
