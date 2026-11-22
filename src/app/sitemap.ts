import { MetadataRoute } from "next";
import { getAllPosts } from "@/sanity/queries";

const BASE = "https://www.apexsolutions.io";

// Refresh CMS-driven sitemap entries periodically without a full deployment.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use Sanity publication/update dates for articles, not the sitemap render date.
  const posts = await getAllPosts();

  return [
    { url: BASE,                                       changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/capabilities`,                     changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services`,                         changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/structured-cabling`,      changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/rack-and-stack`,          changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/ap-refresh`,              changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/smart-hands`,             changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/industries`,                       changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/data-centers`,          changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/logistics-warehousing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries/telecom`,               changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/locations`,                        changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies`,                                changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies/ai-cluster-pod-build`,           changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/case-studies/telecom-transport-lab`,          changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/case-studies/fulfillment-ap-refresh-ontario`, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/case-studies/amazon-ap-refresh`,              changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/resources`,                        changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/rfp-template`,           changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`,                            changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/partners`,                         changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/careers`,                          changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,                          changeFrequency: "yearly",  priority: 0.8 },
    { url: `${BASE}/blog`,                             changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/vendor-registration`,              changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE}/po-terms`,                         changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/privacy`,                          changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,                            changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/accessibility`,                    changeFrequency: "yearly",  priority: 0.3 },
    // Include public CMS articles so search engines can discover them.
    ...posts
      .filter((post) => Boolean(post.slug?.current))
      .map((post) => ({
        url: `${BASE}/blog/${encodeURIComponent(post.slug.current)}`,
        ...(post._updatedAt || post.publishedAt
          ? { lastModified: post._updatedAt || post.publishedAt }
          : {}),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
