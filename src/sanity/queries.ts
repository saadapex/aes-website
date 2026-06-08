import { client } from "./client";

/**
 * Sanity GROQ queries with built-in defensive try/catch.
 *
 * Every public export wraps the underlying `client.fetch()` in a try block. If
 * Sanity is misconfigured (missing env vars, dead network, bad credentials) the
 * function returns an empty result instead of throwing. Pages that depend on
 * this data (e.g. /blog, /careers) all have "no data" fallback states already
 * — see BlogPage's `posts.length === 0` block and CareersPage's job-list
 * empty path — so a Sanity outage degrades to a clean empty state, never a
 * 500.
 */

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: any;
  category?: string;
  author: string;
  publishedAt: string;
  _updatedAt?: string;
  readingTime?: number;
  body?: any[];
}

async function safeFetch<T>(query: string, params: Record<string, unknown> | undefined, fallback: T, label: string): Promise<T> {
  try {
    return await client.fetch<T>(query, params ?? {});
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`[AES Sanity] ${label} failed; returning fallback. ${(err as Error)?.message ?? ""}`);
    return fallback;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  return safeFetch<Post[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt, _updatedAt,
      "readingTime": round(length(pt::text(body)) / 1000)
    }`,
    undefined,
    [],
    "getAllPosts"
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return safeFetch<Post | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt, _updatedAt, body
    }`,
    { slug },
    null,
    "getPostBySlug"
  );
}

export async function getRelatedPosts(currentSlug: string, category?: string, limit = 3): Promise<Post[]> {
  if (category) {
    const sameCat = await safeFetch<Post[]>(
      `*[_type == "post" && slug.current != $currentSlug && category == $category]
        | order(publishedAt desc)[0...$limit] {
        _id, title, slug, excerpt, coverImage, category, author, publishedAt,
        "readingTime": round(length(pt::text(body)) / 1000)
      }`,
      { currentSlug, category, limit },
      [],
      "getRelatedPosts(sameCategory)"
    );
    if (sameCat.length >= limit) return sameCat;
    const need = limit - sameCat.length;
    const filler = await safeFetch<Post[]>(
      `*[_type == "post" && slug.current != $currentSlug && category != $category]
        | order(publishedAt desc)[0...$need] {
        _id, title, slug, excerpt, coverImage, category, author, publishedAt,
        "readingTime": round(length(pt::text(body)) / 1000)
      }`,
      { currentSlug, category, need },
      [],
      "getRelatedPosts(filler)"
    );
    return [...sameCat, ...filler];
  }
  return safeFetch<Post[]>(
    `*[_type == "post" && slug.current != $currentSlug]
      | order(publishedAt desc)[0...$limit] {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt,
      "readingTime": round(length(pt::text(body)) / 1000)
    }`,
    { currentSlug, limit },
    [],
    "getRelatedPosts(noCategory)"
  );
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return safeFetch<{ slug: string }[]>(
    `*[_type == "post"] { "slug": slug.current }`,
    undefined,
    [],
    "getAllPostSlugs"
  );
}

// ── Job Postings ──────────────────────────────────────────────

export interface Job {
  _id: string;
  title: string;
  location: string;
  type: string;
  department?: string;
  summary: string;
  responsibilities?: string[];
  requirements?: string[];
  niceToHave?: string[];
  compensation?: string;
  postedAt: string;
}

export async function getActiveJobs(): Promise<Job[]> {
  return safeFetch<Job[]>(
    `*[_type == "job" && active == true] | order(postedAt desc) {
      _id, title, location, type, department,
      summary, responsibilities, requirements, niceToHave,
      compensation, postedAt
    }`,
    undefined,
    [],
    "getActiveJobs"
  );
}
