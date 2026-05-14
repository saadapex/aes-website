"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { SITE, SERVICES, INDUSTRIES } from "@/lib/utils";

export default function Nav() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [servicesOpen, setServicesOpen]     = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

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

  const closeAll = () => {
    setServicesOpen(false);
    setIndustriesOpen(false);
    setMobileOpen(false);
  };

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
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className={`text-sm font-medium transition-colors ${linkClass}`}>
            Home
          </Link>

          {/* Services dropdown — handlers on wrapper so gap between button and panel is safe */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}>
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* pt-2 bridges the gap — no mt-2 margin that the mouse would fall through */}
            <div className={`absolute top-full left-0 pt-2 w-64 transition-all duration-150 ${
              servicesOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
            }`}>
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[#06284C] hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors"
                  >
                    {s.title}
                    <span className="block text-xs text-[#4E6575] font-normal">{s.subtitle}</span>
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <Link
                    href="/services"
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 text-xs text-[#006FB9] font-semibold hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Industries dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}>
              Industries
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div className={`absolute top-full left-0 pt-2 w-60 transition-all duration-150 ${
              industriesOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
            }`}>
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                {INDUSTRIES.map((i) => (
                  <Link
                    key={i.slug}
                    href={`/industries/${i.slug}`}
                    onClick={() => setIndustriesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[#06284C] hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors"
                  >
                    {i.title}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <Link
                    href="/industries"
                    onClick={() => setIndustriesOpen(false)}
                    className="block px-4 py-2.5 text-xs text-[#006FB9] font-semibold hover:bg-[#F4F7FA] hover:text-[#FF6B00] transition-colors"
                  >
                    View All Industries →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/case-studies" className={`text-sm font-medium transition-colors ${linkClass}`}>
            Case Studies
          </Link>
          <Link href="/blog" className={`text-sm font-medium transition-colors ${linkClass}`}>
            Blog
          </Link>
          <Link href="/about" className={`text-sm font-medium transition-colors ${linkClass}`}>
            About
          </Link>
          <Link href="/contact" className={`text-sm font-medium transition-colors ${linkClass}`}>
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${SITE.phone.replace(/\D/g, "")}`}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${linkClass}`}
          >
            <Phone size={14} /> {SITE.phone}
          </a>
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2.5 px-5"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen
            ? <X    size={24} className={solid ? "text-[#06284C]" : "text-white"} />
            : <Menu size={24} className={solid ? "text-[#06284C]" : "text-white"} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
          <Link href="/"            className="text-[#06284C] font-semibold" onClick={closeAll}>Home</Link>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#4E6575] font-medium mb-3">Services</p>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onClick={closeAll}
                className="flex items-center gap-2 py-2 text-[#06284C] hover:text-[#FF6B00] text-sm border-b border-gray-50 transition-colors"
              >
                <span className="text-[#FF6B00]">›</span>
                {s.title}
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
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                onClick={closeAll}
                className="flex items-center gap-2 py-2 text-[#06284C] hover:text-[#FF6B00] text-sm border-b border-gray-50 transition-colors"
              >
                <span className="text-[#FF6B00]">›</span>
                {i.title}
              </Link>
            ))}
          </div>

          <Link href="/case-studies" className="text-[#06284C] font-semibold" onClick={closeAll}>Case Studies</Link>
          <Link href="/blog"         className="text-[#06284C] font-semibold" onClick={closeAll}>Blog</Link>
          <Link href="/about"        className="text-[#06284C] font-semibold" onClick={closeAll}>About</Link>
          <Link href="/contact"      className="text-[#06284C] font-semibold" onClick={closeAll}>Contact</Link>

          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary justify-center text-center mt-2"
          >
            Book a Planning Call
          </a>
        </div>
      )}
    </header>
  );
}
