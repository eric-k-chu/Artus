/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "outer-space": "#444545",
        aquamarine: "#B5FFE9",
        "mint-green": "#C5E0D8",
        silver: "#C9C9C9",
        "tea-rose": "#CEABB1",
        gray: "#616161",
        void: "#333434",
        cream: "#F5F5F7",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      borderWidth: {
        thin: "1px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
