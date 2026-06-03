import Image from "next/image";
import Link from "next/link";

/**
 * Author bio block shown at the end of a blog post. Currently hard-coded to
 * Saad Usmani since all early AES content is published under his byline. If
 * the team adds more authors later, this should take props from the post.
 */
const AUTHORS: Record<string, { headshot: string; bio: string; linkedIn?: string }> = {
  "Saad Usmani": {
    headshot: "/images/Saad Headshot.png",
    bio:
      "Founder & CEO of Apex Enterprise Solutions. Two decades in telecom, infrastructure deployment, systems engineering, and technical program management. Writes field notes on what actually happens when programs go to the floor.",
    linkedIn: "https://www.linkedin.com/in/saadusmani/",
  },
};

export default function AuthorBio({ author }: { author: string }) {
  const a = AUTHORS[author];
  if (!a) return null;

  return (
    <div className="mt-12 pt-10 border-t border-gray-100">
      <div className="bg-[#F4F7FA] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-5 items-start">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#FF6B00]/40 flex-shrink-0">
          <Image
            src={a.headshot}
            alt={author}
            fill
            className="object-cover object-top"
            sizes="96px"
          />
        </div>
        <div className="flex-1">
          <p className="text-[#FF6B00] text-xs uppercase tracking-widest font-bold mb-1">About the Author</p>
          <h3 className="text-[#06284C] font-bold text-lg mb-2">{author}</h3>
          <p className="text-[#1F2933] text-sm leading-relaxed mb-3">{a.bio}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/about#leadership" className="text-[#006FB9] hover:text-[#FF6B00] font-semibold">
              More from AES leadership →
            </Link>
            {a.linkedIn && (
              <a
                href={a.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#006FB9] hover:text-[#FF6B00] font-semibold"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
