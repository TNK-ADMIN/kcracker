import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#060709",
        charcoal: {
          DEFAULT: "#0d1117",
          border: "#1f2937",
          elevated: "#121824",
        },
        neon: {
          cyan: "#00f5d4",
          amber: "#ffb703",
          green: "#10b981",
          purple: "#7928ca",
          crimson: "#ff0055",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "Courier New", "monospace"],
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(0, 245, 212, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 245, 212, 0.05) 1px, transparent 1px)",
        "radar-radial": "radial-gradient(circle at center, rgba(0, 245, 212, 0.15) 0%, rgba(6, 7, 9, 0.95) 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 8s linear infinite",
        "radar": "radar 4s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 5px rgba(0, 245, 212, 0.4))" },
          "100%": { filter: "drop-shadow(0 0 20px rgba(0, 245, 212, 0.8))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
