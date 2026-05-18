import { headers } from "next/headers";

const BASE = "https://www.apexsolutions.io";

/**
 * Injects <link rel="canonical"> into the document head for every page.
 * Reads the pathname from the x-pathname header set by middleware so the
 * canonical always reflects the actual route without touching every page file.
 */
export default function CanonicalTag() {
  const pathname = headers().get("x-pathname") ?? "/";
  // Strip trailing slash except for root to keep canonicals consistent
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const canonical = `${BASE}${cleanPath}`;

  return <link rel="canonical" href={canonical} />;
}
