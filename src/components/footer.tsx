import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { SITE, SERVICES, INDUSTRIES } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-[#06284C] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand column */}
          <div>
            <Image
              src="/images/logo-reversed-dark.png"
              alt="Apex Enterprise Solutions"
              width={180}
              height={68}
              className="h-12 w-auto mb-3"
            />
            <p className="text-[#4E6575] text-xs tracking-widest uppercase mt-1 mb-4">
              {SITE.tagline}
            </p>
            <p className="text-[#4E6575] text-sm leading-relaxed">
              North America&apos;s field-first infrastructure deployment partner.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#4E6575] mb-4">Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}
                    className="text-sm text-gray-300 hover:text-[#FF6B00] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services"
                  className="text-sm text-gray-300 hover:text-[#FF6B00] transition-colors">
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#4E6575] mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About",        href: "/about" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Industries",   href: "/industries" },
                { label: "Careers",      href: "/careers" },
                { label: "Contact",      href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-sm text-gray-300 hover:text-[#FF6B00] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#4E6575] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2 text-sm text-gray-300 hover:text-[#FF6B00] transition-colors">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 text-[#006FB9]" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\D/g, "")}`}
                  className="flex items-start gap-2 text-sm text-gray-300 hover:text-[#FF6B00] transition-colors">
                  <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#006FB9]" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#006FB9]" />
                  <span>{SITE.address}</span>
                </div>
              </li>
              <li>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#FF6B00] transition-colors mt-2">
                  <Linkedin size={14} className="text-[#006FB9]" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Vendor Registration", href: "/vendor-registration" },
              { label: "PO Terms",            href: "/po-terms" },
              { label: "Become a Partner",    href: "/partners" },
              { label: "Privacy",             href: "/privacy" },
              { label: "Terms",               href: "/terms" },
              { label: "Accessibility",       href: "/accessibility" },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="text-xs text-gray-500 hover:text-[#4E6575] transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href={SITE.capabilityPdf} target="_blank" rel="noopener noreferrer"
              className="text-xs text-[#FF6B00] hover:underline font-semibold">
              ↓ Capability Statement PDF
            </a>
            <span className="text-xs text-gray-600">
              © {new Date().getFullYear()} Apex Enterprise Solutions. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
