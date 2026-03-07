/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          50: "#F7F3EE",
          100: "#EDE5D8",
          200: "#DDD0BC",
          300: "#C4956A",
          400: "#A87A55",
          500: "#8B6F5E",
          600: "#7A6050",
          700: "#6B5249",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
