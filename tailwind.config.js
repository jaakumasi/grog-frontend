/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-bg": "#262626",
        "big-g-bg": "#294E3E",
        "outline": "#07613A",
      },
      textColor: {
        "accent": "#0EBD71"
      }
    },
  },
  plugins: [],
}

