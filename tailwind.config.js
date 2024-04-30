/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B4ED8",
        secondary: "#64748B",
        dark: "#1C2434",
        backGround: "#F1F5F9",
        foreGround: "#FFFFFF",
        menuHover: "#323A48",
        subMenu: "#DAE0EA",
        lightGreen: "#27C08D",
      },
      padding: {
        22: "100px",
      },
      margin: {
        22: "100px",
      },
      borderRadius: {
        complete: "50%",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "3xl": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
    },
  },
  plugins: [],
};
