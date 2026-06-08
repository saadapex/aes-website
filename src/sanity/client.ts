import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Sanity client.
 *
 * Production reads `NEXT_PUBLIC_SANITY_PROJECT_ID` from Vercel env vars. Local
 * `.env.local` may not have it (Sanity is only required for blog + careers data
 * which most local development doesn't need). Without a fallback, `createClient`
 * throws at module-load time and breaks `next build`.
 *
 * Strategy: fall back to a syntactically valid but unused project ID so the
 * client constructs successfully. Any actual API call to a missing project will
 * fail at request time — `queries.ts` wraps every fetch in try/catch and
 * returns empty results so pages render with their "no data" fallback states
 * (e.g. "First post coming soon" on /blog).
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing00";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  // eslint-disable-next-line no-console
  console.warn(
    "[AES] Sanity NEXT_PUBLIC_SANITY_PROJECT_ID is not set. " +
    "Blog and Careers data will be empty. Set the env var to enable CMS content."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
