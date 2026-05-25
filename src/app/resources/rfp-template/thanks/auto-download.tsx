"use client";

import { useEffect } from "react";

interface AutoDownloadProps {
  href: string;
  filename: string;
}

/**
 * Triggers a one-shot file download after the page mounts.
 * Used on lead-magnet thank-you pages to start the download
 * immediately after the form has been submitted.
 */
export default function AutoDownload({ href, filename }: AutoDownloadProps) {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [href, filename]);

  return null;
}
