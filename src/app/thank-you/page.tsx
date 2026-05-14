import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = { title: "Request Received — Apex Enterprise Solutions" };

const NEXT_STEPS = [
  {
    num: "01",
    title: "We Review Your Scope",
    body: "Our team will review your submission and assess fit, timeline, and resource requirements.",
  },
  {
    num: "02",
    title: "We Follow Up Within 1 Business Day",
    body: "Expect a response from Saad or the AES team with questions or a proposal outline.",
  },
  {
    num: "03",
    title: "We Schedule a Planning Call",
    body: "If the scope is a fit, we'll book a call to align on logistics, pricing, and timeline.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="bg-[#F4F7FA] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <CheckCircle size={56} className="text-[#FF6B00] mx-auto mb-6" />
        <h1 className="text-[#06284C] text-4xl font-black mb-3">We&apos;ve Got It.</h1>
        <p className="text-[#1F2933] text-xl mb-8">
          Your request is in. We&apos;ll follow up within one business day.
        </p>

        {/* Calendly nudge */}
        <div className="bg-[#06284C] rounded-xl p-8 mb-12 text-left">
          <p className="text-[#4E6575] text-sm uppercase tracking-widest mb-2">Optional</p>
          <h2 className="text-white font-bold text-xl mb-2">Want to move faster?</h2>
          <p className="text-[#4E6575] mb-4 text-sm">
            Book a planning call directly and we&apos;ll get on the same page sooner.
          </p>
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Planning Call →
          </a>
        </div>

        {/* Next steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {NEXT_STEPS.map((step) => (
            <div key={step.num} className="bg-white rounded-lg p-6 text-left shadow-sm border border-gray-100">
              <div className="text-[#FF6B00] text-xs font-bold uppercase tracking-widest mb-2">{step.num}</div>
              <h3 className="text-[#06284C] font-bold mb-2">{step.title}</h3>
              <p className="text-[#1F2933] text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <Link href="/" className="btn-secondary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
