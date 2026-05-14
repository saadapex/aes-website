import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { SERVICES, SITE } from "@/lib/utils";

export const metadata: Metadata = { title: "Infrastructure Services" };

const serviceDetails: Record<string, { scope: string[]; deliverables: string[]; image: string }> = {
  "structured-cabling": {
    image: "/images/service-structured-cabling.png",
    scope: [
      "Site survey and pathway design; permitting support",
      "CAT6/6A copper runs and terminations",
      "SM/MM fiber pulls and LC/MPO terminations; fusion splicing",
      "OTDR and power meter certification; labeling to TIA/EIA-606",
      "Rack dressing; freezer/cooler and high-bay experience",
    ],
    deliverables: ["Certification Reports", "Label Schema", "As-Builts", "Closeout Pack"],
  },
  "rack-and-stack": {
    image: "/images/service-rack-stack.png",
    scope: [
      "Rack assembly; power whips and PDU installation",
      "Server, storage, and GPU rack-and-stack",
      "100G/400G fabric cabling and cable management",
      "Burn-in and airflow/thermal checks",
      "Acceptance testing and documentation",
    ],
    deliverables: ["Power Mapping", "Burn-In Logs", "Acceptance Test Report"],
  },
  "ap-refresh": {
    image: "/images/service-ap-refresh.png",
    scope: [
      "Predictive and on-site RF surveys",
      "AP mounting and labeling (freezer/cooler rated where required)",
      "Switch patching and configuration",
      "Validation heatmaps and tuning",
      "Night-window cutovers",
    ],
    deliverables: ["Mounting Maps", "Validated Heatmaps", "Punch-List Closeout"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        h1="Infrastructure Services"
        sub="One execution partner from first survey to final handover. Three core services, disciplined delivery."
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 space-y-28">
        {SERVICES.map((service, i) => {
          const details = serviceDetails[service.slug];
          const isEven = i % 2 === 0;
          return (
            <div
              key={service.slug}
              className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Image */}
              <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-lg ${!isEven ? "lg:col-start-2" : ""}`}>
                <Image
                  src={details.image}
                  alt={`${service.title} — Apex Enterprise Solutions`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/40 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                <p className="eyebrow mb-2">Service</p>
                <h2 className="text-[#06284C] text-3xl font-bold mb-1">{service.title}</h2>
                <p className="text-[#4E6575] text-sm uppercase tracking-wide mb-4">{service.subtitle}</p>
                <p className="text-[#1F2933] mb-6">{service.subhead}</p>
                <ul className="space-y-2 mb-8">
                  {details.scope.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[#1F2933]">
                      <span className="text-[#FF6B00] font-bold flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-8">
                  {details.deliverables.map((d) => (
                    <span key={d}
                      className="bg-[#F4F7FA] text-[#06284C] text-xs px-3 py-1.5 rounded-full font-medium border border-[#006FB9]/20">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {service.ctaType === "calendly"
                    ? <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-primary">{service.cta} →</a>
                    : <Link href={service.ctaHref} className="btn-primary">{service.cta} →</Link>
                  }
                  <Link href={`/services/${service.slug}`} className="btn-secondary">Full Scope →</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CtaBand />
    </>
  );
}
