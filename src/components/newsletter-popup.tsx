"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "aes_newsletter_dismissed";

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail]     = useState("");
  const [name, setName]       = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    // Show after 30 seconds
    const t = setTimeout(() => setVisible(true), 30000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (res.ok) {
        setStatus("success");
        localStorage.setItem(STORAGE_KEY, "1");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header band */}
        <div className="bg-[#06284C] px-8 pt-8 pb-6">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <p className="text-[#FF6B00] text-xs uppercase tracking-widest font-semibold mb-2">
            Infrastructure Insights
          </p>
          <h2 className="text-white text-xl font-bold leading-snug">
            Stay ahead on data center & network deployment trends
          </h2>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="text-[#FF6B00] text-4xl mb-3">✓</div>
              <p className="text-[#06284C] font-bold text-lg mb-1">You&apos;re in!</p>
              <p className="text-gray-500 text-sm">We&apos;ll be in touch with field insights and AES updates.</p>
              <button onClick={dismiss} className="mt-4 text-sm text-[#006FB9] hover:underline">
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-5">
                Join infrastructure managers, prime contractors, and integrators who get our monthly field insights. No spam — just useful.
              </p>
              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]"
                />
                <input
                  type="email"
                  required
                  placeholder="Work email *"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006FB9] focus:ring-1 focus:ring-[#006FB9]"
                />
                {status === "error" && (
                  <p className="text-red-500 text-xs">Something went wrong — please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full justify-center text-sm"
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe — It's Free →"}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  You&apos;ll receive a confirmation email — just click the link to activate.{" "}
                  <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>
                </p>
              </form>
              <button onClick={dismiss} className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors">
                No thanks
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
