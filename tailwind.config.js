/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,tsx}", "./core/components/**/*.{js,tsx}", "./core/providers/**/*.{js,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          900: "#111827",
        },
        success: "#10b981",
        error: "#ef4444",
      },
    },
  },
  plugins: [],
};
