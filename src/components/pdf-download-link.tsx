"use client";

import { trackDownload } from "@/lib/track";
import type { ReactNode } from "react";

interface Props {
  href: string;
  fileLabel: string;
  source: string;
  className?: string;
  children: ReactNode;
}

/**
 * Anchor tag that fires a GA4 `file_download` event when clicked. Wraps any
 * static link to a PDF (Capability Statement, RFP Template) so downloads can
 * be measured in GA4 without re-architecting the rest of the page.
 */
export default function PdfDownloadLink({ href, fileLabel, source, className, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDownload(fileLabel, source)}
      className={className}
    >
      {children}
    </a>
  );
}
