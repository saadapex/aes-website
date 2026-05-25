import { permanentRedirect } from "next/navigation";

/**
 * Legacy dynamic location pages have been consolidated into a single
 * /locations coverage page with landmark-image cards. Any visit to an
 * old /locations/{slug} URL gets a permanent (308) redirect to the
 * unified page so SEO authority is preserved and bookmarks still work.
 *
 * The directory itself can be removed in a future cleanup pass once
 * Google has recrawled and absorbed the redirects.
 */
export default function LegacyLocationSlugPage() {
  permanentRedirect("/locations");
}
