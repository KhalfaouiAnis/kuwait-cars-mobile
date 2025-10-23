/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.tsx",
    "./core/components/**/*.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#FAED02",
        },
        secondary: {
          900: "#000000",
        },
        success: "#10b981",
        error: "#ef4444",
      },
      fontFamily: {
        inter: ["InterRegular", "sans-serif"],
        sans: ["InterRegular", "sans-serif"],
        "inter-medium": ["InterMedium", "sans-serif"],
        "inter-semibold": ["InterSemiBold", "sans-serif"],
        "inter-bold": ["InterBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
 