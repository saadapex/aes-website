"use client";

import { useEffect, useState } from "react";
import { X, FileDown } from "lucide-react";
import { SITE } from "@/lib/utils";
import { trackDownload } from "@/lib/track";

/**
 * Polite exit-intent modal that offers the Capability Statement PDF on the
 * user's way out. Shows once per visitor (localStorage key), only on desktop,
 * and never on /contact or /thank-you (already in funnel).
 *
 * Suppression rules:
 *   - localStorage flag `aes_exit_intent_seen` — only shows once
 *   - md+ breakpoint only (mobile users already have the sticky contact bar)
 *   - skipped on /contact, /thank-you, and any /resources/* page
 */
const SEEN_KEY = "aes_exit_intent_seen";

function shouldSuppress(): boolean {
  if (typeof window === "undefined") return true;
  if (window.innerWidth < 768) return true;
  if (localStorage.getItem(SEEN_KEY) === "1") return true;
  const path = window.location.pathname;
  if (path.startsWith("/contact")) return true;
  if (path.startsWith("/thank-you")) return true;
  if (path.startsWith("/resources")) return true;
  return false;
}

export default function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldSuppress()) return;

    // Don't fire on the first 10 seconds of the session — gives the user a real chance to read.
    const ready = Date.now() + 10_000;

    const handler = (e: MouseEvent) => {
      // Trigger when the mouse leaves toward the top of the viewport (toward tabs / URL bar).
      if (e.clientY > 0) return;
      if (Date.now() < ready) return;
      setOpen(true);
      localStorage.setItem(SEEN_KEY, "1");
      document.removeEventListener("mouseout", handler);
    };

    document.addEventListener("mouseout", handler);
    return () => document.removeEventListener("mouseout", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Download Capability Statement"
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 text-[#4E6575] hover:text-[#06284C] p-1.5"
        >
          <X size={18} />
        </button>

        <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] text-xs uppercase tracking-wide font-bold px-3 py-1 rounded mb-4">
          Capability Statement
        </div>
        <h2 className="text-[#06284C] text-2xl font-bold leading-tight mb-3">
          One-page summary of how AES works.
        </h2>
        <p className="text-[#1F2933] text-sm leading-relaxed mb-6">
          Services, coverage, delivery model, documentation deliverables — built to share with procurement, finance, or anyone sizing up AES. Free download, no form.
        </p>

        <a
          href={SITE.capabilityPdf}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDownload("capability_pdf", "exit_intent")}
          className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
        >
          <FileDown size={16} /> Download Capability PDF
        </a>
        <button
          onClick={() => setOpen(false)}
          className="block mx-auto mt-3 text-xs text-[#4E6575] hover:text-[#06284C]"
        >
          No thanks — close this
        </button>
      </div>
    </div>
  );
}
