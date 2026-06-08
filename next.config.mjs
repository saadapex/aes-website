/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production") {
  const required = ["NEXT_PUBLIC_GA_ID", "NEXT_PUBLIC_HUBSPOT_PORTAL_ID"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    console.warn(
      "\n[AES] WARNING: Missing required production env vars: " + missing.join(", ") + ".\n" +
      "Analytics will not fire. Set these in Vercel project settings before launch.\n"
    );
  }
}

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "X-Frame-Options",           value: "SAMEORIGIN" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control",    value: "on" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // script-src adds LinkedIn Insight (snap.licdn.com), Microsoft Clarity
      // (*.clarity.ms), and Vercel Analytics/Speed Insights (va.vercel-scripts.com)
      // alongside the existing GA4 / HubSpot / Calendly / Giscus sources.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://js.hs-scripts.com https://js.hs-analytics.net https://js.hsadspixel.net https://js.hsleadflows.net https://js.hubspot.com https://js.usemessages.com https://assets.calendly.com https://giscus.app https://snap.licdn.com https://*.clarity.ms https://www.clarity.ms https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com https://giscus.app",
      // img-src adds LinkedIn pixel (px.ads.linkedin.com / dc.ads.linkedin.com)
      // and Clarity asset hosts.
      "img-src 'self' data: blob: https://*.googletagmanager.com https://*.google-analytics.com https://*.hubspot.com https://*.hsforms.com https://cdn.sanity.io https://assets.calendly.com https://avatars.githubusercontent.com https://px.ads.linkedin.com https://dc.ads.linkedin.com https://*.clarity.ms",
      "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com",
      // connect-src adds LinkedIn beacon, Clarity ingest, and Vercel Speed
      // Insights submission (vitals.vercel-insights.com).
      "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.hubspot.com https://*.hs-analytics.net https://*.hs-scripts.com https://*.hsforms.com https://api.hsforms.com https://forms.hsforms.com https://cdn.sanity.io https://*.apicdn.sanity.io https://giscus.app https://api.github.com https://px.ads.linkedin.com https://dc.ads.linkedin.com https://*.clarity.ms https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "frame-src 'self' https://calendly.com https://*.calendly.com https://giscus.app",
      "frame-ancestors 'self'",
      "form-action 'self' https://forms.hsforms.com",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

// Legacy Wix URL -> new Next.js URL map (all permanent 301s).
const legacyWixRedirects = [
  { source: "/plan",                destination: "/services" },
  { source: "/build",               destination: "/services" },
  { source: "/manage",              destination: "/services/smart-hands" },

  { source: "/home",                destination: "/" },
  { source: "/why-choose-us",       destination: "/about" },
  { source: "/why-us",              destination: "/about" },
  { source: "/our-services",        destination: "/services" },
  { source: "/services-1",          destination: "/services" },
  { source: "/contact-us",          destination: "/contact" },
  { source: "/get-in-touch",        destination: "/contact" },
  { source: "/our-team",            destination: "/about#leadership" },
  { source: "/team",                destination: "/about#leadership" },
  { source: "/about-us",            destination: "/about" },
  { source: "/government",          destination: "/capabilities" },
  { source: "/government-services", destination: "/capabilities" },

  { source: "/structured-cabling",          destination: "/services/structured-cabling" },
  { source: "/structured-cabling-services", destination: "/services/structured-cabling" },
  { source: "/cabling",                     destination: "/services/structured-cabling" },
  { source: "/fiber",                       destination: "/services/structured-cabling" },
  { source: "/rack-and-stack",              destination: "/services/rack-and-stack" },
  { source: "/rack-stack",                  destination: "/services/rack-and-stack" },
  { source: "/data-center",                 destination: "/services/rack-and-stack" },
  { source: "/data-center-deployment",      destination: "/services/rack-and-stack" },
  { source: "/ap-refresh",                  destination: "/services/ap-refresh" },
  { source: "/wireless",                    destination: "/services/ap-refresh" },
  { source: "/wireless-rollouts",           destination: "/services/ap-refresh" },
  { source: "/smart-hands",                 destination: "/services/smart-hands" },
  { source: "/field-services",              destination: "/services/smart-hands" },

  { source: "/copy-of-home",     destination: "/" },
  { source: "/copy-of-services", destination: "/services" },
  { source: "/copy-of-about",    destination: "/about" },
  { source: "/copy-of-contact",  destination: "/contact" },
  { source: "/copy-of-blog",     destination: "/blog" },

  { source: "/blog-1", destination: "/blog" },

  { source: "/assets/Apex Enterprise Solutions - Capability Statement.pdf",
    destination: "/assets/Apex-Enterprise-Solutions-Capability-Statement.pdf" },
];

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", port: "", pathname: "/images/**" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return legacyWixRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
