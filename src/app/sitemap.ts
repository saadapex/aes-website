import { MetadataRoute } from "next";

const BASE = "https://www.apexsolutions.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                                       lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,                         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/structured-cabling`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/rack-and-stack`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/ap-refresh`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/industries`,                       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/data-centers`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/logistics-warehousing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/enterprise`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/telecom`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies`,                     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies/ai-cluster-pod-build`,     lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/case-studies/warehouse-ap-refresh`,     lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/case-studies/amazon-ap-refresh`,        lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/about`,                            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/partners`,                         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,                             lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/careers`,                          lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,                          lastModified: now, changeFrequency: "yearly",  priority: 0.8 },
    { url: `${BASE}/privacy`,                          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
