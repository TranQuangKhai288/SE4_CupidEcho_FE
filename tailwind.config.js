/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FF6F61",
          dark: "#FF8A80",
        },
        secondary: {
          light: "#757575",
          dark: "#B0BEC5",
        },
      },
    },
  },
  plugins: [],
};
