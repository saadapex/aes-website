import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import PageHero from "@/components/page-hero";
import GiscusComments from "@/components/giscus-comments";
import AuthorBio from "@/components/author-bio";
import RelatedPosts from "@/components/related-posts";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — AES Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://www.apexsolutions.io/blog/${params.slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const ptComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-[#06284C] text-2xl font-bold mt-10 mb-4 leading-tight">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-[#06284C] text-xl font-bold mt-8 mb-3 leading-tight">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-[#06284C] text-lg font-bold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-[#1F2933] leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#FF6B00] pl-5 py-1 my-6 bg-[#F4F7FA] rounded-r-lg">
        <p className="text-[#06284C] font-medium italic leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-[#06284C]">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-[#F4F7FA] text-[#006FB9] px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        className="text-[#006FB9] hover:text-[#FF6B00] underline transition-colors">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-[#4E6575] text-sm mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(params.slug, post.category, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://www.apexsolutions.io/about#leadership",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.apexsolutions.io/#organization",
      name: "Apex Enterprise Solutions",
      url: "https://www.apexsolutions.io",
      logo: {
        "@type": "ImageObject",
        url: "https://www.apexsolutions.io/images/AES_Option3_Primary_Full_Logo_No_Background.png",
      },
    },
    datePublished: post.publishedAt,
    // Sanity auto-stamps _updatedAt on every save; fall back to publishedAt if missing.
    dateModified: post._updatedAt || post.publishedAt,
    url: `https://www.apexsolutions.io/blog/${params.slug}`,
    mainEntityOfPage: `https://www.apexsolutions.io/blog/${params.slug}`,
    inLanguage: "en",
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.coverImage
      ? { image: urlFor(post.coverImage).width(1200).height(630).url() }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PageHero
        eyebrow={post.category || "Blog"}
        h1={post.title}
        sub={post.excerpt}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug.current}` },
        ]}
      />

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full aspect-[7/3] overflow-hidden">
          <Image
            src={urlFor(post.coverImage)
              .width(1400)
              .height(600)
              .fit("crop")
              .crop("focalpoint")
              .auto("format")
              .url()}
            alt={post.title}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06284C]/30 to-transparent" />
        </div>
      )}

      {/* Article */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-12">

          {/* Body */}
          <article className="lg:col-span-3">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <span className="bg-[#F4F7FA] text-[#06284C] text-xs font-semibold px-3 py-1.5 rounded-full">
                {post.author}
              </span>
              <span className="text-[#4E6575] text-sm">{formatDate(post.publishedAt)}</span>
              {post.readingTime && post.readingTime > 0 && (
                <span className="text-[#4E6575] text-sm">{post.readingTime} min read</span>
              )}
              {post.category && (
                <span className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="prose-aes">
              {post.body && <PortableText value={post.body} components={ptComponents} />}
            </div>

            {/* Author bio */}
            <AuthorBio author={post.author} />

            {/* Related posts */}
            <RelatedPosts posts={related} />

            {/* Comments */}
            <GiscusComments />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#06284C] rounded-xl p-6">
                <h3 className="text-white font-bold mb-2">Need Field Execution?</h3>
                <p className="text-[#4E6575] text-sm mb-4 leading-relaxed">
                  Talk to the AES team about your next deployment.
                </p>
                <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                  Get a Quote →
                </Link>
              </div>
              <div className="bg-[#F4F7FA] rounded-xl p-6 border border-[#006FB9]/10">
                <h3 className="text-[#06284C] font-bold mb-3">Our Services</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Structured Cabling", href: "/services/structured-cabling" },
                    { label: "Rack & Stack", href: "/services/rack-and-stack" },
                    { label: "AP Refresh", href: "/services/ap-refresh" },
                  ].map((s) => (
                    <li key={s.href}>
                      <Link href={s.href}
                        className="text-sm text-[#006FB9] hover:text-[#FF6B00] font-medium transition-colors">
                        → {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F4F7FA] rounded-xl p-6 border border-[#006FB9]/10">
                <h3 className="text-[#06284C] font-bold mb-3">Download</h3>
                <a href="/assets/Apex-Enterprise-Solutions-Capability-Statement.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#006FB9] hover:text-[#FF6B00] font-medium transition-colors">
                  ↓ Capability Statement PDF
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
