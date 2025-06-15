
import type { Config } from "tailwindcss";
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			colors: {
				primaryAccent: {
					DEFAULT: '#1e3a8a', // Deep blue
				},
				primaryAccentGreen: {
					DEFAULT: '#059669' // Deep green
				},
				neutralBg: "#f8fafc",
				border: "hsl(214.3,31.8%,91.4%)", // Added for border-border class support
			},
			boxShadow: {
				soft: '0 2px 32px 0 rgba(16,40,80,0.10)',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'none' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.75s cubic-bezier(.45,0,.55,1)',
			},
			transitionTimingFunction: {
				'pop': 'cubic-bezier(.22,1,.36,1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

