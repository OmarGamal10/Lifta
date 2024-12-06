/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        customBg: "url('./src/assets/bg1.svg'), url('./src/assets/bg2.svg')",
      },
      backgroundPosition: {
        customPos: "right top, left 45%", // Custom positions for the images
      },
      backgroundSize: {
        customSize: " 580px 720px, 480px 1024px", // Custom sizes for the images
      },
    },
    colors: {
      backGroundColor: "#0B0D13",
      secondary: "#5F3C68",
      primary: "#A2A7C9",
      textColor: "#E3E5EF",
      accent: "#B076A9",
      error: "#880808",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
