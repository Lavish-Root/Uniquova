import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7545F5",
          dark: "#5030C7",
          light: "#F3EFFF",
          subtle: "#EAE3FF",
          50: "#FAF9FF",
          100: "#F3EFFF",
          200: "#E2D7FE",
          300: "#C4ACFD",
          400: "#9E76FB",
          500: "#7545F5",
          600: "#6030E4",
          700: "#5030C7",
          800: "#3D249E",
          900: "#2B1A70",
        },
        dark: {
          DEFAULT: "#151323",
          surface: "#1E1A33",
          muted: "#6F6A80",
          light: "#9A95AA",
        },
        border: {
          DEFAULT: "#EAE6F4",
          subtle: "#F0EDF7",
        },
        softBg: "#FAF9FF",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': "0 4px 15px rgba(117, 69, 245, 0.15)",
        'glow-md': "0 8px 30px rgba(117, 69, 245, 0.22)",
        'glow-lg': "0 14px 45px rgba(117, 69, 245, 0.30)",
        'glass': "0 8px 32px 0 rgba(117, 69, 245, 0.08)",
        'glass-hover': "0 16px 40px 0 rgba(117, 69, 245, 0.14)",
        'card': "0 2px 14px rgba(21, 19, 35, 0.04), 0 1px 2px rgba(21, 19, 35, 0.02)",
        'card-hover': "0 12px 32px rgba(117, 69, 245, 0.12), 0 2px 6px rgba(21, 19, 35, 0.04)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        marqueeVertical: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        marqueeVerticalReverse: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'marquee-vertical': 'marqueeVertical 35s linear infinite',
        'marquee-vertical-slow': 'marqueeVertical 42s linear infinite',
        'marquee-vertical-reverse': 'marqueeVerticalReverse 35s linear infinite',
        'marquee-vertical-reverse-slow': 'marqueeVerticalReverse 40s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
