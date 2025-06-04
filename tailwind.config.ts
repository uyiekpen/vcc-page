/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ important
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}", // if using /src/app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
