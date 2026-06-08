/**
 * Thin GA4 / dataLayer helper for the client-side events we measure.
 *
 * Every helper:
 *   - Safe in SSR (early returns when window is undefined).
 *   - No-op when GA4 hasn't loaded - analytics.tsx only loads gtag after the
 *     user accepts the analytics consent.
 *   - Pushes to both `gtag` (GA4) and `dataLayer` (any future GTM container).
 *
 * Notes:
 *   - `window.gtag` and `window.dataLayer` are declared globally in
 *     analytics.tsx (`interface Window`). We do not re-declare them here to
 *     avoid TS2687 ("identical modifiers") conflicts.
 *   - We access them via `(window as any)` since the global types declare them
 *     as required, but at runtime they only exist after analytics has loaded.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Core event-pusher. Sends the event to gtag AND mirrors it onto dataLayer.
 * Most callers should use the named helpers below.
 */
function pushEvent(name: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const w = window as any;

  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: name, ...params });
  }
}

/**
 * Track a file download. Used by Capability PDF + RFP Template links.
 */
export function trackDownload(fileLabel: string, source: string = "unknown"): void {
  pushEvent("file_download", {
    file_name: fileLabel,
    file_extension: "pdf",
    source,
  });
}

export type ContactChannel = "phone" | "sms" | "email" | "calendly" | "linkedin";

/**
 * Track a high-intent contact-CTA click (call, text, email, book a meeting).
 */
export function trackContactClick(channel: ContactChannel, source: string = "unknown"): void {
  pushEvent("contact_click", {
    channel,
    source,
    method: channel,
  });
}

/**
 * Track a successful form submission. Fired on /thank-you after the contact
 * form POST + redirect succeeds, so it only counts completed submissions.
 */
export function trackFormSubmit(formName: string, source: string = "unknown"): void {
  pushEvent("form_submit", {
    form_name: formName,
    source,
  });
  pushEvent("generate_lead", {
    form_name: formName,
    source,
    currency: "USD",
    value: 0,
  });
}

/**
 * Track a service-page view as a dedicated event so /services/* funnels
 * are easy to compare in GA4 without filtering by page_path manually.
 */
export function trackServiceView(serviceSlug: string): void {
  pushEvent("service_page_view", {
    service: serviceSlug,
  });
}

/**
 * Track a completed Calendly booking. Distinct from `contact_click` - this
 * fires only when react-calendly's `eventScheduled` callback fires.
 */
export function trackCalendlyBooked(source: string = "unknown"): void {
  pushEvent("calendly_meeting_booked", { source });
  pushEvent("generate_lead", {
    form_name: "calendly_booking",
    source,
    currency: "USD",
    value: 0,
  });
}
