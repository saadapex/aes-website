/**
 * Homepage proof-stat band. Four aggregate field-experience numbers from the
 * AES brand context. Surfaces above-the-fold proof for procurement readers.
 *
 * Numbers represent AES team and partner-ecosystem field experience across
 * multiple programs.
 */
const STATS: { value: string; label: string }[] = [
  { value: "1,000+",  label: "Racks Built & Validated" },
  { value: "1.2M+",   label: "Feet of Fiber Pulled & Certified" },
  { value: "20,000+", label: "Wireless Access Points Installed" },
  { value: "30+",     label: "AI / ML Compute Pods Delivered" },
];

export default function StatsBand() {
  return (
    <section
      className="bg-[#06284C] border-y border-white/5 py-12 lg:py-14"
      aria-label="AES field experience by the numbers"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-[#FF6B00] text-3xl sm:text-4xl lg:text-5xl font-black leading-none mb-2">
                {s.value}
              </p>
              <p className="text-[#7A9FC0] text-xs sm:text-sm uppercase tracking-wide font-medium leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-[#4E6575] mt-8 leading-relaxed">
          Aggregate field experience across AES team and partner-ecosystem programs.
        </p>
      </div>
    </section>
  );
}
