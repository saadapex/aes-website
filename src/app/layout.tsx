import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie-banner";
import Analytics from "@/components/analytics";
import MobileContactBar from "@/components/mobile-contact-bar";
import ExitIntent from "@/components/exit-intent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.apexsolutions.io"),
  title: {
    default: "IT Infrastructure & Data-Center Deployment | Apex Enterprise Solutions",
    template: "%s | Apex Enterprise Solutions",
  },
  description:
    "Apex Enterprise Solutions supports fiber, structured cabling, rack-and-stack, and AI/data center deployments across North America. Field-first, credentialed, on schedule.",
  openGraph: {
    type: "website",
    locale: "en_US",
    // Per-page openGraph metadata in each page.tsx overrides these defaults.
    // We intentionally do NOT set `url` here so Next.js derives og:url per-page
    // from metadataBase + canonical instead of hard-coding the homepage on every page.
    siteName: "Apex Enterprise Solutions",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Apex Enterprise Solutions — Infrastructure Deployment Partner",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  authors: [{ name: "Apex Enterprise Solutions", url: "https://www.apexsolutions.io" }],
  category: "IT Infrastructure",
  alternates: {
    canonical: "https://www.apexsolutions.io",
    languages: {
      "en-US": "https://www.apexsolutions.io",
      "en-CA": "https://www.apexsolutions.io",
      "x-default": "https://www.apexsolutions.io",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.apexsolutions.io/#organization",
  name: "Apex Enterprise Solutions",
  alternateName: "AES",
  url: "https://www.apexsolutions.io",
  logo: "https://www.apexsolutions.io/images/AES_Option3_Primary_Nav_Tight_96px_2x.png",
  description:
    "North America-based field execution partner for IT infrastructure deployment — fiber, structured cabling, rack-and-stack, and AI/data center deployments across North America.",
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
  employee: [
    {
      "@type": "Person",
      "@id": "https://www.apexsolutions.io/about#saad-usmani",
      name: "Saad Usmani",
      jobTitle: "Founder & CEO",
      worksFor: { "@id": "https://www.apexsolutions.io/#organization" },
      url: "https://www.apexsolutions.io/about#leadership",
      sameAs: ["https://www.linkedin.com/in/saadusmani/"],
    },
    {
      "@type": "Person",
      "@id": "https://www.apexsolutions.io/about#vinod-bharwani",
      name: "Vinod Bharwani",
      jobTitle: "Chief Operating Officer",
      worksFor: { "@id": "https://www.apexsolutions.io/#organization" },
      url: "https://www.apexsolutions.io/about#leadership",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.apexsolutions.io/#website",
  name: "Apex Enterprise Solutions",
  url: "https://www.apexsolutions.io",
  publisher: { "@id": "https://www.apexsolutions.io/#organization" },
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
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

        <MobileContactBar />
        <ExitIntent />

        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
