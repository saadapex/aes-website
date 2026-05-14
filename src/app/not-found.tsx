import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-[#06284C] min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-lg">
        <p className="text-[#FF6B00] text-9xl font-black leading-none mb-4 opacity-30 select-none">404</p>
        <h1 className="text-white text-3xl font-bold mb-3">This page doesn&apos;t exist.</h1>
        <p className="text-[#4E6575] text-lg mb-8">But your project does. Let&apos;s get you back on track.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">Back to Home →</Link>
          <Link href="/contact" className="btn-outline-white">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
