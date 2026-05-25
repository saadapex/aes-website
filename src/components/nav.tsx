"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, MessageSquare } from "lucide-react";
import { SITE, SERVICES, INDUSTRIES } from "@/lib/utils";

const ABOUT = [
  { title: "Saad's Background", subtitle: "Founder & CEO — telecom and field execution leader", href: "/about#leadership" },
  { title: "Company",           subtitle: "Who we are & how we work",                          href: "/about" },
  { title: "Capabilities",      subtitle: "Full plain-language overview of AES",               href: "/capabilities" },
  { title: "Partners",          subtitle: "Become an execution partner",                       href: "/partners" },
  { title: "Careers",           subtitle: "Join the AES field team",                           href: "/careers" },
];

const RESOURCES_LINKS = [
  { title: "Resources",  subtitle: "RFP templates, checklists, buyer guides", href: "/resources" },
  { title: "Locations",  subtitle: "U.S. & Canada field coverage markets",    href: "/locations" },
  { title: "Blog",       subtitle: "Field notes from AES deployments",        href: "/blog" },
];

type DropdownKey = "services" | "industries" | "about" | "resources" | null;

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen]           = useState<DropdownKey>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || mobileOpen;

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    solid ? "bg-white shadow-md" : "bg-transparent"
  }`;

  const linkClass = solid
    ? "text-[#06284C] hover:text-[#FF6B00]"
    : "text-white hover:text-[#FF6B00]";

  const closeAll = () => { setOpen(null); setMobileOpen(false); };

  const toggle = (key: DropdownKey) => setOpen(prev => prev === key ? null : key);

  /* ── Dropdown panel ── */
  const Dropdown = ({
    id, width = "w-64", children,
  }: { id: DropdownKey; width?: string; children: React.ReactNode }) => (
    <div className={`absolute top-full left-0 pt-2 ${width} transition-all duration-150 ${
      open === id ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
    }`}>
      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
        {children}
      </div>
    </div>
  );

  return (
    <header className={navClass}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" onClick={closeAll} className="flex-shrink-0">
          <Image
            src={solid ? "/images/AES_Option3_Primary_Nav_Tight_96px_2x.png" : "/images/AES_Option3_Reversed_White_Nav_Tight_96px_2x.png"}
            alt="Apex Enterprise Solutions"
            width={240}
            height={48}
            priority
            className="h-12 w-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">

          {/* Case Studies */}
          <Link href="/case-studies" className={`text-sm font-medium transition-colors ${linkClass}`}>
            Case Studies
          </Link>

          {/* Services */}
          <div className="relative" onMouseEnter={() => setOpen("services")} onMouseLeave={() => setOpen(null)}>
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}
              aria-haspopup="true"
              aria-expanded={open === "services"}
            >
              Services
              <ChevronDown size={14} className={`transition-transform duration-200 ${open === "services" ? "rotate-180" : ""}`} />
            </button>
            <Dropdown id="services" width="w-72">
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} onClick={closeAll}
                  className="block px-4 py-2.5 text-sm text-[#06284C] hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors">
                  {s.title}
                  <span className="block text-xs text-[#4E6575] font-normal">{s.subtitle}</span>
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link href="/services" onClick={closeAll}
                  className="block px-4 py-2.5 text-xs text-[#006FB9] font-semibold hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors">
                  View All Services →
                </Link>
              </div>
            </Dropdown>
          </div>

          {/* Industries */}
          <div className="relative" onMouseEnter={() => setOpen("industries")} onMouseLeave={() => setOpen(null)}>
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}
              aria-haspopup="true"
              aria-expanded={open === "industries"}
            >
              Industries
              <ChevronDown size={14} className={`transition-transform duration-200 ${open === "industries" ? "rotate-180" : ""}`} />
            </button>
            <Dropdown id="industries" width="w-64">
              {INDUSTRIES.map((i) => (
                <Link key={i.slug} href={`/industries/${i.slug}`} onClick={closeAll}
                  className="block px-4 py-2.5 text-sm text-[#06284C] hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors">
                  {i.title}
                </Link>
              ))}
            </Dropdown>
          </div>

          {/* About */}
          <div className="relative" onMouseEnter={() => setOpen("about")} onMouseLeave={() => setOpen(null)}>
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}
              aria-haspopup="true"
              aria-expanded={open === "about"}
            >
              About
              <ChevronDown size={14} className={`transition-transform duration-200 ${open === "about" ? "rotate-180" : ""}`} />
            </button>
            <Dropdown id="about" width="w-72">
              {ABOUT.map((c) => (
                <Link key={c.href} href={c.href} onClick={closeAll}
                  className="block px-4 py-2.5 text-sm text-[#06284C] hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors">
                  {c.title}
                  <span className="block text-xs text-[#4E6575] font-normal">{c.subtitle}</span>
                </Link>
              ))}
            </Dropdown>
          </div>

          {/* Resources */}
          <div className="relative" onMouseEnter={() => setOpen("resources")} onMouseLeave={() => setOpen(null)}>
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}
              aria-haspopup="true"
              aria-expanded={open === "resources"}
            >
              Resources
              <ChevronDown size={14} className={`transition-transform duration-200 ${open === "resources" ? "rotate-180" : ""}`} />
            </button>
            <Dropdown id="resources" width="w-72">
              {RESOURCES_LINKS.map((c) => (
                <Link key={c.href} href={c.href} onClick={closeAll}
                  className="block px-4 py-2.5 text-sm text-[#06284C] hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors">
                  {c.title}
                  <span className="block text-xs text-[#4E6575] font-normal">{c.subtitle}</span>
                </Link>
              ))}
            </Dropdown>
          </div>

          <Link href="/contact" className={`text-sm font-medium transition-colors ${linkClass}`}>
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <a href={`tel:+1${SITE.phone.replace(/\D/g, "")}`}
              aria-label={`Call ${SITE.phone}`}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${linkClass}`}>
              <Phone size={14} /> {SITE.phone}
            </a>
            <a href={`sms:+1${SITE.phone.replace(/\D/g, "")}`}
              aria-label={`Text ${SITE.phone}`}
              title="Text us"
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border transition-colors ${
                solid
                  ? "border-[#006FB9]/30 text-[#006FB9] hover:border-[#FF6B00] hover:text-[#FF6B00]"
                  : "border-white/40 text-white hover:border-[#FF6B00] hover:text-[#FF6B00]"
              }`}>
              <MessageSquare size={12} /> Text
            </a>
          </div>
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
            className="btn-primary text-sm py-2.5 px-5">
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen
            ? <X    size={24} className={solid ? "text-[#06284C]" : "text-white"} />
            : <Menu size={24} className={solid ? "text-[#06284C]" : "text-white"} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">

          <Link href="/case-studies" onClick={closeAll}
            className="text-[#06284C] font-semibold hover:text-[#FF6B00] transition-colors">
            Case Studies
          </Link>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#4E6575] font-medium mb-3">Services</p>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} onClick={closeAll}
                className="flex items-center gap-2 py-2 text-[#06284C] hover:text-[#FF6B00] text-sm border-b border-gray-50 transition-colors">
                <span className="text-[#FF6B00]">›</span>{s.title}
              </Link>
            ))}
            <Link href="/services" onClick={closeAll}
              className="block mt-2 text-xs text-[#006FB9] font-semibold hover:text-[#FF6B00] transition-colors">
              View All Services →
            </Link>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#4E6575] font-medium mb-3">Industries</p>
            {INDUSTRIES.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} onClick={closeAll}
                className="flex items-center gap-2 py-2 text-[#06284C] hover:text-[#FF6B00] text-sm border-b border-gray-50 transition-colors">
                <span className="text-[#FF6B00]">›</span>{i.title}
              </Link>
            ))}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#4E6575] font-medium mb-3">About</p>
            {ABOUT.map((c) => (
              <Link key={c.href} href={c.href} onClick={closeAll}
                className="flex items-center gap-2 py-2 text-[#06284C] hover:text-[#FF6B00] text-sm border-b border-gray-50 transition-colors">
                <span className="text-[#FF6B00]">›</span>{c.title}
              </Link>
            ))}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#4E6575] font-medium mb-3">Resources</p>
            {RESOURCES_LINKS.map((c) => (
              <Link key={c.href} href={c.href} onClick={closeAll}
                className="flex items-center gap-2 py-2 text-[#06284C] hover:text-[#FF6B00] text-sm border-b border-gray-50 transition-colors">
                <span className="text-[#FF6B00]">›</span>{c.title}
              </Link>
            ))}
          </div>

          <Link href="/contact" className="text-[#06284C] font-semibold" onClick={closeAll}>Contact</Link>

          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
            className="btn-primary justify-center text-center mt-2">
            Book a Call
          </a>
        </div>
      )}
    </header>
  );
}
