"use client";

import { useEffect } from "react";
import { getConsent, ConsentState } from "./cookie-banner";

const GA_ID         = process.env.NEXT_PUBLIC_GA_ID                 || "";
const HS_ID         = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID     || "";
const LI_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID   || "";
const CLARITY_ID    = process.env.NEXT_PUBLIC_CLARITY_ID            || "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    _hsq?: unknown[][];
    _linkedin_data_partner_ids?: string[];
    clarity?: (...args: unknown[]) => void;
  }
}

function loadGA() {
  if (!GA_ID || typeof window === "undefined") return;
  if (document.getElementById("ga4-script")) return;

  const s = document.createElement("script");
  s.id = "ga4-script";
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  s.async = true;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) { (window.dataLayer as unknown[]).push(args); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

function loadHubSpot() {
  if (!HS_ID || typeof window === "undefined") return;
  if (document.getElementById("hs-script")) return;

  const s = document.createElement("script");
  s.id = "hs-script";
  s.src = "//js.hs-scripts.com/" + HS_ID + ".js";
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

// LinkedIn Insight Tag - powers LinkedIn-ad retargeting + conversion tracking.
function loadLinkedInInsight() {
  if (!LI_PARTNER_ID || typeof window === "undefined") return;
  if (document.getElementById("linkedin-insight")) return;

  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(LI_PARTNER_ID);

  const s = document.createElement("script");
  s.id = "linkedin-insight";
  s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.async = true;
  document.head.appendChild(s);
}

// Microsoft Clarity - free heatmaps + session recordings.
function loadClarity() {
  if (!CLARITY_ID || typeof window === "undefined") return;
  if (document.getElementById("clarity-script")) return;

  const s = document.createElement("script");
  s.id = "clarity-script";
  s.async = true;
  s.innerHTML =
    "(function(c,l,a,r,i,t,y){" +
    "c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};" +
    "t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;" +
    "y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);" +
    "})(window, document, 'clarity', 'script', '" + CLARITY_ID + "');";
  document.head.appendChild(s);
}

export default function Analytics() {
  useEffect(() => {
    const apply = (consent: ConsentState) => {
      if (consent.analytics) {
        loadGA();
        loadClarity();
      }
      if (consent.marketing) {
        loadHubSpot();
        loadLinkedInInsight();
      }
    };

    const saved = getConsent();
    if (saved) apply(saved);

    const handler = (e: Event) => apply((e as CustomEvent<ConsentState>).detail);
    window.addEventListener("aes_consent_updated", handler);
    return () => window.removeEventListener("aes_consent_updated", handler);
  }, []);

  return null;
}
