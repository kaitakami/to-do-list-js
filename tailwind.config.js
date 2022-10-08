/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        dark: "rgba(42, 42, 56, 0.8)",
        "gray-dark": "#3b3b48",
        gray: "#595976",
        "gray-light": "rgba(209, 209, 223, 0.7)",
        "white": "#d1d1df",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
