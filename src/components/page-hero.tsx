import Link from "next/link";
import Image from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  h1: string;
  sub?: string;
  cta?: { label: string; href: string; external?: boolean };
  breadcrumb?: { label: string; href: string }[];
  image?: { src: string; alt: string };
}

export default function PageHero({ eyebrow, h1, sub, cta, breadcrumb, image }: PageHeroProps) {
  const breadcrumbSchema = breadcrumb
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.label,
          item: `https://www.apexsolutions.io${crumb.href}`,
        })),
      }
    : null;

  return (
    <section className="bg-[#0D1F3C] pt-24 md:pt-32 pb-12 md:pb-16 px-5 sm:px-6 lg:px-12">
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <div className={`max-w-7xl mx-auto ${image ? "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" : ""}`}>
        {/* Text column */}
        <div>
          {breadcrumb && (
            <nav className="flex flex-wrap items-center gap-1.5 text-[#7A9FC0] text-xs sm:text-sm mb-5">
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
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">
            {h1}
          </h1>
          {sub && (
            <p className="text-[#7A9FC0] text-base sm:text-lg md:text-xl max-w-2xl mb-6 md:mb-8 leading-relaxed">
              {sub}
            </p>
          )}
          {cta && (
            cta.external
              ? <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary">{cta.label}</a>
              : <Link href={cta.href} className="btn-primary">{cta.label}</Link>
          )}
        </div>

        {/* Image column — only rendered when image prop is provided */}
        {image && (
          <div className="hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority
              />
              {/* Navy gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F3C]/50 via-transparent to-transparent" />
              {/* Left edge fade to blend with text column */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F3C]/30 via-transparent to-transparent" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
