import Link from "next/link";
import { SITE } from "@/lib/utils";

interface CtaBandProps {
  heading?: string;
  sub?: string;
}

export default function CtaBand({
  heading = "Have a project in mind?",
  sub     = "Talk to us about your scope. We'll tell you exactly how we can help.",
}: CtaBandProps) {
  return (
    <section className="bg-[#006FB9] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">{heading}</h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{sub}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary justify-center">
            Get a Quote →
          </Link>
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
            className="btn-outline-white justify-center">
            Book a Planning Call →
          </a>
        </div>
      </div>
    </section>
  );
}
