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
  body?: any[];
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt, body
    }`,
    { slug }
  );
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const posts = await client.fetch(
    `*[_type == "post"] { "slug": slug.current }`
  );
  return posts;
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
  return client.fetch(
    `*[_type == "job" && active == true] | order(postedAt desc) {
      _id, title, location, type, department,
      summary, responsibilities, requirements, niceToHave,
      compensation, postedAt
    }`
  );
}
