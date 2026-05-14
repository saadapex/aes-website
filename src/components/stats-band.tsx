"use client";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/utils";

export default function StatsBand() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#06284C] border-t border-[#006FB9]/30 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((stat) => (
          <div key={stat.label}
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="text-[#FF6B00] text-4xl md:text-5xl font-black mb-2">
              {stat.value}
            </div>
            <div className="text-[#4E6575] text-sm uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
