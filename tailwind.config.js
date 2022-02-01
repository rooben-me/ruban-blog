module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rany: ["Rany", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
