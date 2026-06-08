import Link from "next/link";
import { SITE } from "@/lib/utils";
import TrackedContactLink from "@/components/tracked-contact-link";
import type { ContactChannel } from "@/lib/track";

export interface CtaButtonConfig {
  label: string;
  href: string;
  external?: boolean;
}

interface CtaBandProps {
  heading?: string;
  sub?: string;
  primary?: CtaButtonConfig;
  secondary?: CtaButtonConfig;
}

/**
 * Site-wide closing CTA band. Defaults to sales-funnel CTAs (Get a Quote /
 * Book a Call). Pages that need candidate or partner CTAs (Careers,
 * Vendor Registration) pass `primary` and `secondary` overrides.
 */
export default function CtaBand({
  heading = "Have scope? AES will execute it.",
  sub     = "Send us the details and we'll respond within one business day with a clear path forward.",
  primary,
  secondary,
}: CtaBandProps) {
  const p = primary  ?? { label: "Get a Quote →", href: "/contact" };
  const s = secondary ?? { label: "Book a Call →", href: SITE.calendly, external: true };

  // Detect which "contact channel" a CTA points at so high-intent clicks
  // (Calendly, mailto, tel) show up as `contact_click` events in GA4.
  const detectChannel = (href: string): ContactChannel | null => {
    if (href === SITE.calendly || href.includes("calendly.com")) return "calendly";
    if (href.startsWith("mailto:")) return "email";
    if (href.startsWith("tel:"))    return "phone";
    if (href.startsWith("sms:"))    return "sms";
    return null;
  };

  const renderBtn = (cfg: CtaButtonConfig, cls: string) => {
    const channel = detectChannel(cfg.href);
    if (channel) {
      return (
        <TrackedContactLink
          href={cfg.href}
          channel={channel}
          source="cta_band"
          external={cfg.external}
          className={cls}
        >
          {cfg.label}
        </TrackedContactLink>
      );
    }
    if (cfg.external || cfg.href.startsWith("http")) {
      return (
        <a href={cfg.href} target={cfg.external ? "_blank" : undefined}
          rel={cfg.external ? "noopener noreferrer" : undefined}
          className={cls}>
          {cfg.label}
        </a>
      );
    }
    return (
      <Link href={cfg.href} className={cls}>
        {cfg.label}
      </Link>
    );
  };

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
