"use client";

import { useEffect } from "react";
import Script from "next/script";
import { getConsent, ConsentState } from "./cookie-banner";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const HS_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    _hsq: unknown[][];
  }
}

function loadGA() {
  if (!GA_ID || typeof window === "undefined") return;
  if (document.getElementById("ga4-script")) return;

  const s = document.createElement("script");
  s.id = "ga4-script";
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) { window.dataLayer.push(args); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

function loadHubSpot() {
  if (!HS_ID || typeof window === "undefined") return;
  if (document.getElementById("hs-script")) return;

  const s = document.createElement("script");
  s.id = "hs-script";
  s.src = `//js.hs-scripts.com/${HS_ID}.js`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

export default function Analytics() {
  useEffect(() => {
    const apply = (consent: ConsentState) => {
      if (consent.analytics) loadGA();
      if (consent.marketing) loadHubSpot();
    };

    // Apply saved consent on mount
    const saved = getConsent();
    if (saved) apply(saved);

    // Listen for consent changes
    const handler = (e: Event) => apply((e as CustomEvent<ConsentState>).detail);
    window.addEventListener("aes_consent_updated", handler);
    return () => window.removeEventListener("aes_consent_updated", handler);
  }, []);

  return null;
}
