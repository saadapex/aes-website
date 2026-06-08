"use client";

import { useEffect } from "react";
import { trackFormSubmit } from "@/lib/track";

/**
 * Fires `form_submit` and `generate_lead` GA4 events once on mount.
 *
 * The contact form is a server POST → /api/contact → 303 redirect to
 * /thank-you on success. That redirect IS the success signal, so firing the
 * conversion event here means we only count completed submissions (no
 * client-side noise from accidental double-clicks or validation failures).
 *
 * Defaults match what the contact form sends; pages that need a different
 * label (vendor registration, RFP gate) can pass overrides.
 */
export default function ThankYouTracker({
  formName = "contact_form",
  source   = "contact_page",
}: {
  formName?: string;
  source?: string;
}) {
  useEffect(() => {
    trackFormSubmit(formName, source);
  }, [formName, source]);

  return null;
}
