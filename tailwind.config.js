/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.tsx", "./core/components/**/*.tsx"],
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
        success: "#25D366",
        error: "#FF123D",
        darkish: "#1F1F1F",
        grayish: "#A8A8A8",
        whitish: "#FBFBFB",
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
