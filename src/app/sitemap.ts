import { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";

const BASE = "https://www.apexsolutions.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const locationEntries: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BASE}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE,                                       lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/capabilities`,                     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services`,                         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/structured-cabling`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/rack-and-stack`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/ap-refresh`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/smart-hands`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/industries`,                       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/data-centers`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/logistics-warehousing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/telecom`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/locations`,                        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...locationEntries,
    { url: `${BASE}/case-studies`,                               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies/telecom-transport-lab`,         lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/case-studies/fulfillment-ap-refresh-ontario`,lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/case-studies/amazon-ap-refresh`,             lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/resources`,                        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`,                            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/partners`,                         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/careers`,                          lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,                          lastModified: now, changeFrequency: "yearly",  priority: 0.8 },
    { url: `${BASE}/blog`,                             lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/privacy`,                          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,                            lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/accessibility`,                    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
