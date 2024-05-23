/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-bg": "#262626",
        "component-green": "#294E3E",
        "outline": "#07613A",
        "accent": "#0EBD71",
        "disabled": "#C3D2CB",
        "active-btn": "#075E38"
      },
      textColor: {
        "accent": "#0EBD71",
        "error": "#C20000",
      },
      borderColor: {
        "outline": "#07613A",
        "accent": "#0EBD71",
        "error": "#C20000",
      }
    },
  },
  plugins: [],
}

