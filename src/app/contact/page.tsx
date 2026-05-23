import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import PageHero from "@/components/page-hero";
import FormErrorBanner from "@/components/form-error-banner";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Apex Enterprise Solutions to scope your next infrastructure deployment \u2014 structured cabling, rack-and-stack, or AP refresh across the U.S. and Canada.",
  alternates: { canonical: "https://www.apexsolutions.io/contact" },
};

const NEXT_STEPS = [
  {
    step: "01",
    heading: "We Review Your Scope",
    body: "Your submission goes directly to our team \u2014 not a ticketing queue. Within one business day, a real person has read your scope and is thinking about how AES can execute it.",
  },
  {
    step: "02",
    heading: "You Get a Straight Answer",
    body: "We come back with a clear take: what we can do, how we&apos;d approach it, and rough pricing. No vague follow-up calls just to gather the same information twice.",
  },
  {
    step: "03",
    heading: "We Get to Work",
    body: "Scope aligned \u2014 we mobilize the right crew, confirm the schedule, and get your project on the calendar. From first contact to boots on the ground, we move fast.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero h1="Let&apos;s Talk Infrastructure" sub="Send us your scope. We&apos;ll respond within one business day with a straight answer on how AES can execute it." />
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">

          {/* Form \u2014 3 cols */}
          <div className="lg:col-span-3">
            <Suspense fallback={null}>
              <FormErrorBanner message="Something went wrong submitting your request \u2014 please try again or email us directly at info@apexsolutions.io." />
            </Suspense>
            <form action="/api/contact" method="POST" className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Full Name *</label>
                  <input name="name" required type="text" placeholder="Jane Smith"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Work Email *</label>
                  <input name="email" required type="email" placeholder="jane@company.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Phone</label>
                  <input name="phone" type="tel" placeholder="(555) 000-0000"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Company</label>
                  <input name="company" type="text" placeholder="Acme Corp"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Project Location(s)</label>
                  <input name="locations" type="text" placeholder="e.g. Dallas TX, Toronto ON"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Target Start Date</label>
                  <input name="startDate" type="text" placeholder="e.g. Q3 2026"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]" />
                </div>
              </div>

              {/* Services checkboxes */}
              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-3">Services Needed</label>
                <div className="flex flex-wrap gap-3">
                  {["Structured Cabling","Rack & Stack","AP Refresh"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="services" value={s}
                        className="w-4 h-4 accent-[#FF6B00]" />
                      <span className="text-sm text-gray-700">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Brief Scope Description</label>
                <textarea name="scope" rows={4} placeholder="Tell us what you&apos;re working on..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9] resize-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#06284C] mb-1.5">Upload RFP or BOM <span className="text-gray-400 font-normal">(optional)</span></label>
                <input name="file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#F4F7FA] file:text-[#06284C] file:font-semibold hover:file:bg-[#006FB9]/10" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="nda" className="w-4 h-4 accent-[#FF6B00]" />
                <span className="text-sm text-gray-600">NDA Required</span>
              </label>

              {/* Hidden UTM fields */}
              <input type="hidden" name="utm_source" />
              <input type="hidden" name="utm_medium" />
              <input type="hidden" name="utm_campaign" />

              <button type="submit" className="btn-primary w-full justify-center text-base">
                Submit Request &rarr;
              </button>
              <p className="text-xs text-gray-400 text-center">We respond within one business day. Your information is never sold or shared.</p>
            </form>
          </div>

          {/* Sidebar \u2014 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-[#06284C] font-bold text-lg mb-4">Or book a time directly</h3>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                Book a Call &rarr;
              </a>
            </div>
            <div className="border-t border-gray-100 pt-6 space-y-4">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-gray-700 hover:text-[#FF6B00] transition-colors">
                <Mail size={16} className="text-[#006FB9]" /> {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="flex items-center gap-3 text-gray-700 hover:text-[#FF6B00] transition-colors">
                <Phone size={16} className="text-[#006FB9]" /> {SITE.phone}
              </a>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin size={16} className="text-[#006FB9] mt-0.5 flex-shrink-0" /> {SITE.address}
              </div>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-[#FF6B00] transition-colors">
                <Linkedin size={16} className="text-[#006FB9]" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">After You Submit</p>
          <h2 className="text-[#06284C] text-3xl font-bold mb-12">What Happens Next</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {NEXT_STEPS.map(({ step, heading, body }) => (
              <div key={step} className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-[#FF6B00] text-5xl font-black leading-none mb-5 opacity-20 select-none">{step}</div>
                <h3 className="text-[#06284C] font-bold text-lg mb-3">{heading}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: body }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
