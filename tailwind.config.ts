
import type { Config } from "tailwindcss";

// Define blues, black, and a very light grey background
const blues = {
  50: "#f0f6fc",
  100: "#ddeaf7",
  200: "#b6d6ee",
  300: "#78aee5",
  400: "#4481e0", // Main accent
  500: "#3763c9", // Darker blue
  600: "#2447a2", // Even darker
  700: "#193377",
  800: "#0d1837",
  900: "#0a1122",
};

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ...blues,
        blue: blues,
        "blue-50": blues[50],
        "blue-400": blues[400],
        "blue-500": blues[500],
        "blue-600": blues[600],
        "blue-900": blues[900],
        black: "#111216",
        white: "#fff",
        background: "#f8fafc", // very light grey used everywhere
        surface: "#f4f6fa", // slightly darker than background for cards/shadows
        muted: "#64748b",
        border: "#e5e7eb",
        "gray-light": "#f3f4f6",
        "gray-medium": "#e5e7eb",
        primary: blues[600],
        "primary-foreground": "#fff",
        accent: blues[400],
        "accent-foreground": "#fff"
      },
      boxShadow: {
        soft: '0 2px 32px 0 rgba(16,40,80,0.08)',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(90deg, #2447a2 0%, #4481e0 100%)',
        'brand-gradient': 'linear-gradient(90deg, #193377 0%, #3763c9 70%, #4481e0 100%)',
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(.45,0,.55,1)",
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
