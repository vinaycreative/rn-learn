/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#0F172A",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          dark: "#1E293B",
          elevated: "#FFFFFF",
          "elevated-dark": "#334155",
        },
        foreground: {
          DEFAULT: "#0F172A",
          dark: "#F8FAFC",
          muted: "#64748B",
          "muted-dark": "#94A3B8",
        },
        primary: {
          DEFAULT: "#0F766E",
          foreground: "#FFFFFF",
          dark: "#2DD4BF",
          "foreground-dark": "#042F2E",
        },
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#334155",
        },
        success: {
          DEFAULT: "#15803D",
          dark: "#4ADE80",
        },
        warning: {
          DEFAULT: "#CA8A04",
          dark: "#FACC15",
        },
        error: {
          DEFAULT: "#DC2626",
          dark: "#F87171",
        },
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
      },
    },
  },
  plugins: [],
}
