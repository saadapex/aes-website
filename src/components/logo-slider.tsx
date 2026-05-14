"use client";

const PARTNERS = [
  { name: "HPE",              src: "/images/Partners%20Logo/HPE-Logo.png" },
  { name: "Black Box",        src: "/images/Partners%20Logo/Blackbox-Logo.jpg" },
  { name: "DataKnox",         src: "/images/Partners%20Logo/636bbbf913f59171dda12e5b_dataknox-blue.svg" },
  { name: "High Plains",      src: "/images/Partners%20Logo/hpc-highplains-logo.png.webp" },
  { name: "NETS",             src: "/images/Partners%20Logo/nets-logo-1024x728.png" },
  { name: "Exertherm",        src: "/images/Partners%20Logo/Exertherm%20logo.svg" },
  { name: "Wraab",            src: "/images/Partners%20Logo/wraab.png" },
];

export default function LogoSlider() {
  // Duplicate for seamless infinite scroll
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-white border-y border-gray-100 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-6">
        <p className="text-xs uppercase tracking-widest text-[#4E6575] font-medium text-center">
          Trusted Partners &amp; Vendors
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div className="flex gap-14 items-center logo-marquee">
          {doubled.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center h-14 w-40 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.name}
                className="max-h-12 max-w-[140px] w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .logo-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .logo-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
