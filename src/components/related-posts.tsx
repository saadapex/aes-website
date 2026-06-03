import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * "Related Posts" block shown below the author bio on a blog post.
 * Three most recent posts from the same category, or filler if not enough.
 */
export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <h2 className="text-[#06284C] text-2xl font-bold mb-8">More Field Notes</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative w-full aspect-video bg-[#F4F7FA]">
              {post.coverImage ? (
                <Image
                  src={urlFor(post.coverImage).width(480).height(270).fit("crop").auto("format").url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#06284C] to-[#006FB9] flex items-center justify-center">
                  <span className="text-white/20 text-4xl font-black">AES</span>
                </div>
              )}
              {post.category && (
                <span className="absolute top-3 left-3 bg-[#FF6B00] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1 p-5">
              <p className="text-[#4E6575] text-xs mb-2">{formatDate(post.publishedAt)} · {post.author}</p>
              <h3 className="text-[#06284C] font-bold text-base leading-snug mb-2 group-hover:text-[#FF6B00] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#1F2933] text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
