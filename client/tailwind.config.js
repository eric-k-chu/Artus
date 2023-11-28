/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        silver: "#C9C9C9",
        gray: "#616161",
        "d-p": "#BB86FC",
        "d-s": "#03DAC6",
        "d-bg": "#121212",
        "d-bg-01dp": "#1E1E1E",
        "d-bg-03dp": "#232323",
        "d-bg-12dp": "#323232",
        "d-err": "#CF6679",
        "l-p": "#6200EE",
        "l-s": "#03DAC6",
        "l-bg-1": "#FFFFFF",
        "l-bg-2": "#F8F8F8",
        "l-bg-3": "#F0F0F0",
        "l-bg-4": "#E8E8E8",
        "l-err": "#B00020",
        "l-shdw": "#2f383d33",
        "l-brdr": "#e2e8f0",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
