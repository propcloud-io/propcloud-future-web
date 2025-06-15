
import type { Config } from "tailwindcss";

const propcloudBlue = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e",
};

const mint = {
  50:  "#ecfcf7",
  100: "#d5f7ee",
  200: "#b0efe0",
  300: "#7ae9d1",
  400: "#5eead4", // used as highlight accent
  500: "#2dd4bf", // main mint accent, matches Tailwind syntax for "mint"
  600: "#14b8a6",
  700: "#0d9488",
  800: "#0f766e",
  900: "#115e59",
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
        ...propcloudBlue,
        ...mint,
        propcloud: propcloudBlue,
        mint,
        "mint-50": mint[50],
        "mint-200": mint[200],
        "mint-400": mint[400],
        "mint-500": mint[500],
        "mint-600": mint[600],
        "propcloud-50": propcloudBlue[50],
        "propcloud-400": propcloudBlue[400],
        "propcloud-500": propcloudBlue[500],
        "propcloud-600": propcloudBlue[600],
        "propcloud-900": propcloudBlue[900],
        primary: propcloudBlue[600],
        "primary-foreground": "#fff",
        accent: mint[400],
        "accent-foreground": "#fff",
        background: "#fff",
        surface: "#f8fafc",
        muted: "#64748b",
        border: "#e5e7eb",
        "muted-foreground": "#64748b",
        "gray-light": "#f3f4f6",
        "gray-medium": "#e5e7eb",
      },
      boxShadow: {
        soft: '0 2px 32px 0 rgba(16,40,80,0.10)',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(90deg, #0c4a6e 0%, #0284c7 100%)',
        'brand-gradient': 'linear-gradient(90deg, #0c4a6e 0%, #0ea5e9 70%, #38bdf8 100%)',
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
