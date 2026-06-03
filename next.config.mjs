/** @type {import('next').NextConfig} */

// Build-time env var assertion for production builds.
// If GA4 or HubSpot IDs are missing in production, analytics fail silently.
// We surface that here so a misconfigured Vercel deploy is loud at build time.
if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production") {
  const required = ["NEXT_PUBLIC_GA_ID", "NEXT_PUBLIC_HUBSPOT_PORTAL_ID"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `\n[AES] WARNING: Missing required production env vars: ${missing.join(", ")}.\n` +
      `Analytics will not fire. Set these in Vercel project settings before launch.\n`
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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://js.hs-scripts.com https://js.hs-analytics.net https://js.hsadspixel.net https://js.hsleadflows.net https://js.hubspot.com https://js.usemessages.com https://assets.calendly.com https://giscus.app",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com https://giscus.app",
      "img-src 'self' data: blob: https://*.googletagmanager.com https://*.google-analytics.com https://*.hubspot.com https://*.hsforms.com https://cdn.sanity.io https://assets.calendly.com https://avatars.githubusercontent.com",
      "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com",
      "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.hubspot.com https://*.hs-analytics.net https://*.hs-scripts.com https://*.hsforms.com https://api.hsforms.com https://forms.hsforms.com https://cdn.sanity.io https://*.apicdn.sanity.io https://giscus.app https://api.github.com",
      "frame-src 'self' https://calendly.com https://*.calendly.com https://giscus.app",
      "frame-ancestors 'self'",
      "form-action 'self' https://forms.hsforms.com",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
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
    return [
      // 301 the old en-dash capability statement filename to the new ASCII filename.
      {
        source: "/assets/Apex Enterprise Solutions – Capability Statement.pdf",
        destination: "/assets/Apex-Enterprise-Solutions-Capability-Statement.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
