"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/utils";

/**
 * Sticky mobile-only contact bar that appears after the user scrolls past the hero.
 * Three high-intent actions: Request Site Walk · Call · Text.
 *
 * Hidden on:
 *   - desktop (md+ breakpoint)
 *   - while the cookie banner is open (would overlap)
 *   - on /contact and Calendly already-engaged surfaces
 */
export default function MobileContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't render on the contact page — the form is already in view.
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/contact")) {
      return;
    }

    const onScroll = () => {
      // Show after 600px of scroll (well past the hero on every page).
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const tel = `+1${SITE.phone.replace(/\D/g, "")}`;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#06284C] border-t border-white/10 shadow-2xl"
      role="region"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-1.5 py-3 text-[#FF6B00] font-bold text-xs uppercase tracking-wide hover:bg-white/5"
        >
          Site Walk <ArrowRight size={12} />
        </Link>
        <a
          href={`tel:${tel}`}
          aria-label={`Call ${SITE.phone}`}
          className="flex items-center justify-center gap-1.5 py-3 text-white font-semibold text-xs uppercase tracking-wide hover:bg-white/5"
        >
          <Phone size={13} /> Call
        </a>
        <a
          href={`sms:${tel}`}
          aria-label={`Text ${SITE.phone}`}
          className="flex items-center justify-center gap-1.5 py-3 text-white font-semibold text-xs uppercase tracking-wide hover:bg-white/5"
        >
          <MessageSquare size={13} /> Text
        </a>
      </div>
    </div>
  );
}
