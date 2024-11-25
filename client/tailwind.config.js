/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        color1: "#F5EFFF",
        darkcolor1: "#8058a7",
      }
    },
  },
  daisyui: {
    themes: ["fantasy"],
  },
  plugins: [require('daisyui'),],
}