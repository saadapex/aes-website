import Link from "next/link";

export default function GiscusComments() {
  return (
    <div className="mt-12 pt-10 border-t border-gray-100">
      <div className="bg-[#06284C] rounded-2xl p-8 md:p-10">
        <p className="text-[#4E6575] uppercase tracking-widest text-xs font-semibold mb-3">
          Get In Touch
        </p>
        <h2 className="text-white text-2xl font-bold leading-snug mb-3">
          Have questions about this deployment?
        </h2>
        <p className="text-[#7A9FC0] text-sm leading-relaxed mb-6 max-w-lg">
          Whether you&apos;re scoping a similar project or looking for a field execution partner,
          the AES team is happy to talk through the details.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact"
            className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors">
            Talk to the AES Team →
          </Link>
          <a href="/assets/Apex-Enterprise-Solutions-Capability-Statement.pdf"
            target="_blank" rel="noopener noreferrer"
            className="border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">
            ↓ Download Capability Statement
          </a>
        </div>
      </div>
    </div>
  );
}
