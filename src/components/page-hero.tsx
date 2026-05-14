import Link from "next/link";

interface PageHeroProps {
  eyebrow?: string;
  h1: string;
  sub?: string;
  cta?: { label: string; href: string; external?: boolean };
  breadcrumb?: { label: string; href: string }[];
}

export default function PageHero({ eyebrow, h1, sub, cta, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-[#06284C] pt-24 md:pt-32 pb-12 md:pb-16 px-5 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {breadcrumb && (
          <nav className="flex flex-wrap items-center gap-1.5 text-[#4E6575] text-xs sm:text-sm mb-5">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span className="opacity-40">›</span>}
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="text-[#4E6575] uppercase tracking-widest text-xs sm:text-sm font-medium mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">
          {h1}
        </h1>
        {sub && (
          <p className="text-[#4E6575] text-base sm:text-lg md:text-xl max-w-2xl mb-6 md:mb-8 leading-relaxed">
            {sub}
          </p>
        )}
        {cta && (
          cta.external
            ? <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary">{cta.label}</a>
            : <Link href={cta.href} className="btn-primary">{cta.label}</Link>
        )}
      </div>
    </section>
  );
}
