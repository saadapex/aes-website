import type { ReactNode } from "react";
import Link from "next/link";
import { Cable, Server, Wifi } from "lucide-react";

const icons: Record<string, ReactNode> = {
  "structured-cabling": <Cable  size={32} className="text-[#006FB9]" />,
  "rack-and-stack":     <Server size={32} className="text-[#006FB9]" />,
  "ap-refresh":         <Wifi   size={32} className="text-[#006FB9]" />,
};

interface ServiceCardProps {
  slug: string;
  title: string;
  subtitle: string;
  subhead: string;
}

export default function ServiceCard({ slug, title, subtitle, subhead }: ServiceCardProps) {
  return (
    <div className="group bg-white border border-gray-100 rounded-lg p-6 shadow-sm
                    hover:shadow-md transition-all duration-200 flex flex-col
                    border-t-4 border-t-[#006FB9] hover:border-t-[#FF6B00]">
      <div className="mb-4">{icons[slug]}</div>
      <h3 className="text-[#06284C] font-bold text-xl mb-1">{title}</h3>
      <p className="text-[#4E6575] text-xs uppercase tracking-wide mb-3">{subtitle}</p>
      <p className="text-[#1F2933] text-sm leading-relaxed flex-1">{subhead}</p>
      <Link href={`/services/${slug}`}
        className="mt-4 text-[#006FB9] font-semibold text-sm group-hover:text-[#FF6B00] transition-colors">
        Learn More →
      </Link>
    </div>
  );
}
