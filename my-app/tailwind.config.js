/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.js",
    "./src/pages/**/*.js",
    "./src/app/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
