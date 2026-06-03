/**
 * Thin GA4 / dataLayer helper for the few client-side events we care about.
 * Safe to call in SSR contexts — checks for `window.gtag` and `window.dataLayer`
 * before pushing anything. If consent has not been granted, the GA4 script
 * isn't loaded (see components/analytics.tsx) and these calls are no-ops.
 *
 * Notes:
 *   - `window.gtag` and `window.dataLayer` are declared globally in
 *     analytics.tsx (`interface Window`). We do not re-declare them here to
 *     avoid TS2687 ("identical modifiers") conflicts.
 *   - We access them via `(window as any)` since the global types declare them
 *     as required, but at runtime they only exist after analytics has loaded.
 */

/**
 * Track a file download. Used by Capability PDF + RFP Template links.
 *
 * @param fileLabel - e.g. "capability_pdf", "rfp_template"
 * @param source    - where the user clicked from, e.g. "footer", "hero", "exit_intent"
 */
export function trackDownload(fileLabel: string, source: string = "unknown"): void {
  if (typeof window === "undefined") return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;

  if (typeof w.gtag === "function") {
    w.gtag("event", "file_download", {
      file_name: fileLabel,
      file_extension: "pdf",
      source,
    });
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: "file_download",
      file_name: fileLabel,
      source,
    });
  }
}
