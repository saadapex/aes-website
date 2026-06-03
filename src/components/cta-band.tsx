import Link from "next/link";
import { SITE } from "@/lib/utils";

export interface CtaButtonConfig {
  label: string;
  href: string;
  external?: boolean;
}

interface CtaBandProps {
  heading?: string;
  sub?: string;
  /** Override the default primary button (orange). */
  primary?: CtaButtonConfig;
  /** Override the default secondary button (outline). */
  secondary?: CtaButtonConfig;
}

/**
 * Site-wide closing CTA band. Defaults to sales-funnel CTAs
 * (Get a Quote / Book a Call). Pages that need candidate or
 * partner CTAs (Careers, Vendor Registration, etc.) pass
 * `primary` and `secondary` overrides to keep the journey on-topic.
 */
export default function CtaBand({
  heading = "Have scope? AES will execute it.",
  sub     = "Send us the details and we'll respond within one business day with a clear path forward.",
  primary,
  secondary,
}: CtaBandProps) {
  const p = primary  ?? { label: "Get a Quote →", href: "/contact" };
  const s = secondary ?? { label: "Book a Call →", href: SITE.calendly, external: true };

  const renderBtn = (cfg: CtaButtonConfig, cls: string) =>
    cfg.external || cfg.href.startsWith("http") || cfg.href.startsWith("mailto:") ? (
      <a href={cfg.href} target={cfg.external ? "_blank" : undefined}
        rel={cfg.external ? "noopener noreferrer" : undefined}
        className={cls}>
        {cfg.label}
      </a>
    ) : (
      <Link href={cfg.href} className={cls}>
        {cfg.label}
      </Link>
    );

  return (
    <section className="bg-[#006FB9] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">{heading}</h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{sub}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {renderBtn(p, "btn-primary justify-center")}
          {renderBtn(s, "btn-outline-white justify-center")}
        </div>
      </div>
    </section>
  );
}
