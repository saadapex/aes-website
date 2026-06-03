import { client } from "./client";

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

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt, _updatedAt,
      "readingTime": round(length(pt::text(body)) / 1000)
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt, _updatedAt, body
    }`,
    { slug }
  );
}

export async function getRelatedPosts(currentSlug: string, category?: string, limit = 3): Promise<Post[]> {
  if (category) {
    const sameCat: Post[] = await client.fetch(
      `*[_type == "post" && slug.current != $currentSlug && category == $category]
        | order(publishedAt desc)[0...$limit] {
        _id, title, slug, excerpt, coverImage, category, author, publishedAt,
        "readingTime": round(length(pt::text(body)) / 1000)
      }`,
      { currentSlug, category, limit }
    );
    if (sameCat.length >= limit) return sameCat;
    const need = limit - sameCat.length;
    const filler: Post[] = await client.fetch(
      `*[_type == "post" && slug.current != $currentSlug && category != $category]
        | order(publishedAt desc)[0...$need] {
        _id, title, slug, excerpt, coverImage, category, author, publishedAt,
        "readingTime": round(length(pt::text(body)) / 1000)
      }`,
      { currentSlug, category, need }
    );
    return [...sameCat, ...filler];
  }
  return client.fetch(
    `*[_type == "post" && slug.current != $currentSlug]
      | order(publishedAt desc)[0...$limit] {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt,
      "readingTime": round(length(pt::text(body)) / 1000)
    }`,
    { currentSlug, limit }
  );
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const posts = await client.fetch(
    `*[_type == "post"] { "slug": slug.current }`
  );
  return posts;
}

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
  return client.fetch(
    `*[_type == "job" && active == true] | order(postedAt desc) {
      _id, title, location, type, department,
      summary, responsibilities, requirements, niceToHave,
      compensation, postedAt
    }`
  );
}
