/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    theme: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
    },
    extend: {
      colors: {
        red: "hsl(0, 87%, 67%)",
        cyan: "hsl(180, 66%, 49%)",
        darkViolet: "hsl(257, 27%, 26%)",
        grayish: "hsl(0, 0%, 75%)",
        grayishViolet: "hsl(257, 7%, 63%)",
        veryDarkBlue: "hsl(255, 11%, 22%)",
        veryDarkViolet: "hsl(260, 8%, 14%)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};



