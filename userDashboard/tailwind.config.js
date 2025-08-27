/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bluorng-black': '#000000',
        'bluorng-white': '#ffffff',
        'bluorng-gray': '#f5f5f5',
        'bluorng-dark-gray': '#333333',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 