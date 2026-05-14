"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "aes_cookie_consent";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setConsent(state: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("aes_consent_updated", { detail: state }));
}

export default function CookieBanner() {
  const [visible, setVisible]   = useState(false);
  const [manage, setManage]     = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    if (!getConsent()) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    setVisible(false);
  };

  const declineAll = () => {
    setConsent({ analytics: false, marketing: false });
    setVisible(false);
  };

  const savePreferences = () => {
    setConsent({ analytics, marketing });
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#06284C] text-white rounded-xl shadow-2xl border border-white/10 p-6">
        {!manage ? (
          /* ── Default banner ── */
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold mb-1">We use cookies 🍪</p>
              <p className="text-[#4E6575] text-sm leading-relaxed">
                We use cookies to improve your experience, analyse traffic, and support our marketing.
                By clicking &quot;Accept All&quot; you consent to our use of cookies.{" "}
                <Link href="/privacy" className="text-[#FF6B00] hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <button
                onClick={() => setManage(true)}
                className="text-sm text-gray-300 hover:text-white border border-white/20 rounded-lg px-4 py-2 transition-colors"
              >
                Manage Preferences
              </button>
              <button
                onClick={declineAll}
                className="text-sm text-gray-300 hover:text-white border border-white/20 rounded-lg px-4 py-2 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={acceptAll}
                className="text-sm bg-[#FF6B00] hover:bg-[#e55f00] text-white font-semibold rounded-lg px-5 py-2 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* ── Manage preferences ── */
          <div>
            <p className="font-semibold mb-4">Manage Cookie Preferences</p>
            <div className="space-y-4 mb-6">
              {/* Necessary — always on */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Necessary Cookies</p>
                  <p className="text-xs text-[#4E6575] mt-0.5">Required for the site to function. Cannot be disabled.</p>
                </div>
                <span className="text-xs text-[#FF6B00] font-semibold flex-shrink-0 mt-0.5">Always On</span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Analytics Cookies</p>
                  <p className="text-xs text-[#4E6575] mt-0.5">Help us understand how visitors interact with the site (Google Analytics).</p>
                </div>
                <button
                  onClick={() => setAnalytics(!analytics)}
                  className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors mt-0.5 ${analytics ? "bg-[#FF6B00]" : "bg-gray-600"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${analytics ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Marketing Cookies</p>
                  <p className="text-xs text-[#4E6575] mt-0.5">Used for HubSpot tracking and lead attribution.</p>
                </div>
                <button
                  onClick={() => setMarketing(!marketing)}
                  className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors mt-0.5 ${marketing ? "bg-[#FF6B00]" : "bg-gray-600"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${marketing ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => setManage(false)}
                className="text-sm text-gray-300 hover:text-white border border-white/20 rounded-lg px-4 py-2 transition-colors">
                Back
              </button>
              <button onClick={savePreferences}
                className="text-sm bg-[#FF6B00] hover:bg-[#e55f00] text-white font-semibold rounded-lg px-5 py-2 transition-colors">
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
