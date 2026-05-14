import type { Metadata } from "next";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import PageHero from "@/components/page-hero";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Apex Enterprise Solutions to scope your next infrastructure deployment — structured cabling, rack-and-stack, or AP refresh across the U.S. and Canada.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero h1="Let's Talk Infrastructure" sub="Tell us about your project and we'll get back within one business day." />
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">

          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
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
                <textarea name="scope" rows={4} placeholder="Tell us what you're working on..."
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
                Submit Request →
              </button>
              <p className="text-xs text-gray-400 text-center">Protected by reCAPTCHA v3. Your info is never sold.</p>
            </form>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-[#06284C] font-bold text-lg mb-4">Or book a time directly</h3>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                Book a Planning Call →
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
    </>
  );
}
