import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /thank-you has its own noindex meta tag; allow crawling so bots can see it.
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: "https://www.apexsolutions.io/sitemap.xml",
  };
}
