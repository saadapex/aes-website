import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { getAllPosts, type Post } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";

export const metadata: Metadata = { title: "Blog — Apex Enterprise Solutions" };
export const revalidate = 60;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPage() {
  let posts: Post[] = [];
  try { posts = await getAllPosts(); } catch {}

  return (
    <>
      <PageHero
        eyebrow="Insights"
        h1="Field Notes from the Floor"
        sub="Perspectives on data center deployment, structured cabling, wireless rollouts, and infrastructure execution from the AES team."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-[#F4F7FA] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📝</span>
              </div>
              <h2 className="text-[#06284C] text-2xl font-bold mb-3">First post coming soon</h2>
              <p className="text-[#4E6575] mb-6 max-w-md mx-auto">
                We&apos;re putting together insights from the field. Check back shortly.
              </p>
              <Link href="/contact" className="btn-primary">Get In Touch →</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                  {/* Cover image */}
                  <div className="relative w-full aspect-video bg-[#F4F7FA] overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).width(600).height(338).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#06284C] to-[#006FB9] flex items-center justify-center">
                        <span className="text-white/20 text-6xl font-black">AES</span>
                      </div>
                    )}
                    {post.category && (
                      <span className="absolute top-3 left-3 bg-[#FF6B00] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-[#4E6575] text-xs mb-2">
                      {formatDate(post.publishedAt)} · {post.author}
                    </p>
                    <h2 className="text-[#06284C] font-bold text-lg leading-snug mb-3 group-hover:text-[#FF6B00] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[#1F2933] text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                    <span className="text-[#006FB9] text-sm font-semibold group-hover:text-[#FF6B00] transition-colors">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
