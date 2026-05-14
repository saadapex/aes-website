import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AES Brand Tokens — from Branding Document (Tech Orange system)
        "aes-navy":    "#06284C", // Apex Navy — headers, covers, premium BG
        "aes-blue":    "#006FB9", // Apex Blue — links, nodes, section accents
        "aes-orange":  "#FF6B00", // Tech Orange — ALL CTAs, highlights, priority
        "aes-slate":   "#4E6575", // Steel Slate — captions, diagrams, support
        "aes-charcoal":"#1F2933", // Charcoal — body text, technical labels
        "aes-offwhite":"#F4F7FA", // Cloud White — page & section backgrounds
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        countUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
