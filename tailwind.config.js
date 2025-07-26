/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // ✅ Add this line
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Add this line if you use a components folder
    "./src/**/*.{js,ts,jsx,tsx}",   // ✅ Optional if you use /src
  ],

  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-in-out",
      },
    },
  },
  plugins: [],
};