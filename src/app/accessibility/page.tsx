import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = { title: "Accessibility" };

export default function Page() {
  return (
    <>
      <PageHero h1="Accessibility" />
      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-500 italic">[Content coming soon — add copy before launch]</p>
        </div>
      </section>
    </>
  );
}
