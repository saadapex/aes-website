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
