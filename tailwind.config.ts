
import type { Config } from "tailwindcss";

const propcloudNavy = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
};

const warmGray = {
  50: "#fafaf9",
  100: "#f5f5f4",
  200: "#e7e5e4",
  300: "#d6d3d1",
  400: "#a8a29e",
  500: "#78716c",
  600: "#57534e",
  700: "#44403c",
  800: "#292524",
  900: "#1c1917",
};

const tealAccent = {
  50: "#f0fdfa",
  100: "#ccfbf1",
  200: "#99f6e4",
  300: "#5eead4",
  400: "#2dd4bf",
  500: "#14b8a6",
  600: "#0d9488",
  700: "#0f766e",
  800: "#115e59",
  900: "#134e4a",
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
        propcloud: propcloudNavy,
        accent: tealAccent,
        gray: warmGray,
        "propcloud-50": propcloudNavy[50],
        "propcloud-100": propcloudNavy[100],
        "propcloud-200": propcloudNavy[200],
        "propcloud-300": propcloudNavy[300],
        "propcloud-400": propcloudNavy[400],
        "propcloud-500": propcloudNavy[500],
        "propcloud-600": propcloudNavy[600],
        "propcloud-700": propcloudNavy[700],
        "propcloud-800": propcloudNavy[800],
        "propcloud-900": propcloudNavy[900],
        "accent-50": tealAccent[50],
        "accent-100": tealAccent[100],
        "accent-200": tealAccent[200],
        "accent-300": tealAccent[300],
        "accent-400": tealAccent[400],
        "accent-500": tealAccent[500],
        "accent-600": tealAccent[600],
        "accent-700": tealAccent[700],
        "accent-800": tealAccent[800],
        "accent-900": tealAccent[900],
        primary: propcloudNavy[700],
        "primary-foreground": "#fff",
        background: "#fafafa",
        surface: "#f8fafc",
        muted: warmGray[500],
        border: warmGray[200],
        "muted-foreground": warmGray[600],
        "gray-light": warmGray[100],
        "gray-medium": warmGray[300],
      },
      boxShadow: {
        soft: '0 2px 32px 0 rgba(15,23,42,0.08)',
        'soft-lg': '0 4px 48px 0 rgba(15,23,42,0.12)',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(90deg, #0f172a 0%, #334155 100%)',
        'brand-gradient': 'linear-gradient(90deg, #0f172a 0%, #334155 70%, #475569 100%)',
        'accent-gradient': 'linear-gradient(90deg, #334155 0%, #14b8a6 100%)',
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(.45,0,.55,1)",
        "scale-in": "scale-in 0.2s ease-out",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      lineHeight: {
        'relaxed': '1.625',
        'loose': '2',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
