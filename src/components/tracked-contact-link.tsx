"use client";

import { ReactNode } from "react";
import { trackContactClick, ContactChannel } from "@/lib/track";

type Props = {
  /** tel:..., sms:..., mailto:..., or external URL (Calendly, LinkedIn) */
  href: string;
  /** Channel for GA4 — phone | sms | email | calendly | linkedin */
  channel: ContactChannel;
  /** Where on the site the user clicked from — "footer", "nav", "mobile_bar", "contact_page", etc. */
  source: string;
  /** Visible label / icons */
  children: ReactNode;
  /** Optional className passthrough so server-component callers can style this exactly like an <a> */
  className?: string;
  /** aria-label passthrough */
  "aria-label"?: string;
  /** Open in new tab? Defaults to false for tel/sms/mailto, true for http(s) */
  external?: boolean;
};

/**
 * Drop-in <a> replacement that fires a `contact_click` GA4 event before
 * navigation. Use anywhere a tel:/sms:/mailto:/Calendly link appears in a
 * server component (the parent doesn't need "use client" itself).
 *
 * The event fires inside onClick — modern browsers complete the gtag push
 * before navigating away because gtag.js uses `sendBeacon` under the hood.
 * For tel/sms/mailto the page doesn't navigate, so there's no race.
 */
export default function TrackedContactLink({
  href,
  channel,
  source,
  children,
  className,
  external,
  ...rest
}: Props) {
  const isExternalUrl = href.startsWith("http");
  const openNewTab = external ?? isExternalUrl;

  return (
    <a
      href={href}
      className={className}
      onClick={() => trackContactClick(channel, source)}
      {...(openNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
