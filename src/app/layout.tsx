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
    "Apex Enterprise Solutions delivers structured cabling, rack-and-stack, and large-scale AP refresh across the U.S. & Canada. Field-first, certified, on schedule.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
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
