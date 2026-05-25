import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Download } from "lucide-react";
import PageHero from "@/components/page-hero";
import AutoDownload from "./auto-download";

export const metadata: Metadata = {
  title: "Your RFP Template Is Ready",
  description: "Your AES Structured Cabling RFP Template download is ready.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.apexsolutions.io/resources/rfp-template/thanks" },
};

const PDF_PATH = "/assets/AES_Structured_Cabling_RFP_Template_v2.2.pdf";

export default function RfpThanksPage() {
  return (
    <>
      <AutoDownload href={PDF_PATH} filename="AES_Structured_Cabling_RFP_Template_v2.2.pdf" />
      <PageHero
        eyebrow="Download Ready"
        h1="Your RFP Template Is Ready"
        sub="Thanks for the details. Your download should start automatically in a moment — if it doesn't, use the button below."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "RFP Template", href: "/resources/rfp-template" },
        ]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto text-center">

          <div className="bg-[#F4F7FA] rounded-xl p-10 border border-gray-100 shadow-sm mb-10">
            <CheckCircle size={56} className="text-[#FF6B00] mx-auto mb-5" />
            <h2 className="text-[#06284C] text-2xl font-bold mb-3">You&apos;re all set</h2>
            <p className="text-[#1F2933] leading-relaxed mb-7">
              The AES Structured Cabling &amp; Fiber RFP Template (v2.2) is downloading now.
              Check your downloads folder for{" "}
              <code className="text-xs bg-white px-2 py-1 rounded border border-gray-200">AES_Structured_Cabling_RFP_Template_v2.2.pdf</code>.
            </p>
            <a
              href={PDF_PATH}
              download="AES_Structured_Cabling_RFP_Template_v2.2.pdf"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Download size={16} /> Download Manually
            </a>
          </div>

          <div className="text-left bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
            <h3 className="text-[#06284C] text-xl font-bold mb-4">What to do next</h3>
            <ol className="space-y-4 text-[#1F2933]">
              <li className="flex gap-4">
                <span className="text-[#FF6B00] font-black text-xl flex-shrink-0">1</span>
                <div>
                  <strong className="text-[#06284C]">Open the PDF in Adobe Acrobat or any modern PDF reader.</strong>
                  <p className="text-sm text-[#4E6575] mt-1">The form fields are interactive — you can fill them in digitally and save.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B00] font-black text-xl flex-shrink-0">2</span>
                <div>
                  <strong className="text-[#06284C]">Drop in your project details.</strong>
                  <p className="text-sm text-[#4E6575] mt-1">Scope, sites, timing, evaluation criteria — replace the sample text with your actual requirements.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B00] font-black text-xl flex-shrink-0">3</span>
                <div>
                  <strong className="text-[#06284C]">Send it out — including to AES if we&apos;re a fit.</strong>
                  <p className="text-sm text-[#4E6575] mt-1">
                    If you&apos;d like AES to bid the work or review your scope, use the <Link href="/contact" className="text-[#006FB9] hover:text-[#FF6B00] underline">contact form</Link> or email <a href="mailto:info@apexsolutions.io" className="text-[#006FB9] hover:text-[#FF6B00] underline">info@apexsolutions.io</a> directly.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/resources" className="btn-secondary">← Back to Resources</Link>
            <Link href="/contact" className="btn-primary">Send Your Scope to AES →</Link>
          </div>
        </div>
      </section>

    </>
  );
}
