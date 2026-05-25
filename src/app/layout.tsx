import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie-banner";
import Analytics from "@/components/analytics";
import NewsletterPopup from "@/components/newsletter-popup";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.apexsolutions.io"),
  title: {
    default: "IT Infrastructure & Data-Center Deployment | Apex Enterprise Solutions",
    template: "%s | Apex Enterprise Solutions",
  },
  description:
    "Apex Enterprise Solutions delivers structured cabling, rack-and-stack, large-scale AP refresh, and smart hands across the U.S. and Canada. Field-first, credentialed, on schedule.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.apexsolutions.io",
    siteName: "Apex Enterprise Solutions",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Apex Enterprise Solutions — Infrastructure Deployment Partner" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  authors: [{ name: "Apex Enterprise Solutions", url: "https://www.apexsolutions.io" }],
  category: "IT Infrastructure",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Apex Enterprise Solutions",
  alternateName: "AES",
  url: "https://www.apexsolutions.io",
  logo: "https://www.apexsolutions.io/images/AES_Option3_Primary_Nav_Tight_96px_2x.png",
  description:
    "North America-based field execution partner for IT infrastructure deployment — structured cabling, rack-and-stack, AP refresh, and smart hands across the U.S. and Canada.",
  email: "info@apexsolutions.io",
  telephone: "+1-669-251-7810",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1069 Duane Ct",
    addressLocality: "Sunnyvale",
    addressRegion: "CA",
    postalCode: "94085",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+1-669-251-7810",
      email: "info@apexsolutions.io",
      areaServed: ["US", "CA"],
      availableLanguage: ["English"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/apexenterprisesolutions/",
    "https://x.com/apexensolutions",
    "https://www.instagram.com/apexenterprisesolutions",
    "https://www.facebook.com/apexenterprisesolutions",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Apex Enterprise Solutions",
  url: "https://www.apexsolutions.io",
  publisher: { "@type": "Organization", name: "Apex Enterprise Solutions" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {/* Site-wide JSON-LD: Organization + WebSite schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <Nav />
        <main>{children}</main>
        <Footer />

        {/* Cookie-consent-gated analytics (GA4 + HubSpot) */}
        <Analytics />

        {/* GDPR cookie consent banner */}
        <CookieBanner />

        {/* Newsletter lead capture popup — fires after 30s */}
        <NewsletterPopup />
      </body>
    </html>
  );
}
