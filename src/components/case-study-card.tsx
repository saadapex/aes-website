import Image from "next/image";
import Link from "next/link";

const IMAGES: Record<string, string> = {
  "ai-cluster-pod-build":  "/images/case-ai-cluster.png",
  "warehouse-ap-refresh":  "/images/case-warehouse-ap.png",
  "amazon-ap-refresh":     "/images/case-amazon-ap.png",
};

interface CaseStudyCardProps {
  slug: string;
  title: string;
  tag: string;
  location: string;
  metrics: readonly string[];
}

export default function CaseStudyCard({ slug, title, tag, location, metrics }: CaseStudyCardProps) {
  const imgSrc = IMAGES[slug];

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="aspect-video bg-[#06284C] relative">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#06284C] to-[#006FB9]" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/70 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
          {tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-[#4E6575] text-xs uppercase tracking-wide mb-1">{location}</p>
        <h3 className="text-[#06284C] font-bold text-lg mb-3">{title}</h3>
        <ul className="space-y-1.5 mb-4">
          {metrics.map((m) => (
            <li key={m} className="flex items-start gap-2 text-sm text-[#1F2933]">
              <span className="text-[#FF6B00] font-bold mt-0.5 flex-shrink-0">›</span>
              {m}
            </li>
          ))}
        </ul>
        <Link href={`/case-studies/${slug}`}
          className="text-[#006FB9] font-semibold text-sm hover:text-[#FF6B00] transition-colors">
          Read Case Study →
        </Link>
      </div>
    </div>
  );
}
