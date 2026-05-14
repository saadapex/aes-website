import { MetadataRoute } from "next";
import { SERVICES, INDUSTRIES, CASE_STUDIES } from "@/lib/utils";

const BASE_URL = "https://www.apexsolutions.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/", "/services", "/industries", "/case-studies",
    "/about", "/contact",
    "/vendor-registration", "/po-terms", "/partners",
    "/privacy", "/terms", "/accessibility",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const industryRoutes = INDUSTRIES.map((i) => ({
    url: `${BASE_URL}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = CASE_STUDIES.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...caseStudyRoutes];
}
