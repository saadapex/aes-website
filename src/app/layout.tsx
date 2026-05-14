import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "IT Infrastructure & Data-Center Deployment | Apex Enterprise Solutions",
    template: "%s | Apex Enterprise Solutions",
  },
  description:
    "Apex delivers structured cabling, rack-and-stack, and large-scale AP refresh across the U.S. & Canada. Field-first, certified, on schedule.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.apexsolutions.io",
    siteName: "Apex Enterprise Solutions",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Apex Enterprise Solutions — Infrastructure Deployment Partner" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />

        {/* GTM — replace GTM-XXXXXXX with real ID */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');`}
        </Script>

        {/* LinkedIn Insight Tag — replace _linkedin_partner_id with real ID */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`_linkedin_partner_id = "XXXXXXX";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);`}
        </Script>
      </body>
    </html>
  );
}
