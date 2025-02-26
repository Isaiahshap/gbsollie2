import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom color palette for G.B. Sollie
        primary: {
          DEFAULT: "#122848", // Dark night blue from the screenshot
          light: "#1e3c6e",
          dark: "#0a1a30"
        },
        secondary: {
          DEFAULT: "#F9D56E", // Warm yellow from the "Explore Books" button
          light: "#FBDF8E",
          dark: "#E8C24E"
        },
        accent: {
          DEFAULT: "#3B82F6", // Blue for interactive elements
          purple: "#8B5CF6",
          teal: "#14B8A6",
          orange: "#F97316"
        },
        midnight: {
          DEFAULT: "#0F172A", // Dark blue for night scenes
          light: "#1E293B",
          dark: "#020617"
        },
        moonlight: {
          DEFAULT: "#F8FAFC", // Light color for moon elements
          glow: "#E2E8F0"
        }
      },
      fontFamily: {
        display: ["var(--font-enchanted)", "serif"],
        heading: ["var(--font-whimsical)", "sans-serif"],
        body: ["var(--font-readable)", "sans-serif"]
      },
      borderRadius: {
        'whimsical': '1.5rem'
      },
      animation: {
        'float': 'floating 6s ease-in-out infinite',
        'twinkle': 'twinkling 3s ease-in-out infinite',
        'page-turn': 'pageTurn 1.2s ease-in-out'
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        twinkling: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        },
        pageTurn: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' }
        }
      },
      backgroundImage: {
        'night-forest': "url('/images/night-forest-bg.jpg')",
        'paper-texture': "url('/images/paper-texture.jpg')"
      }
    },
  },
  plugins: [],
} satisfies Config;
