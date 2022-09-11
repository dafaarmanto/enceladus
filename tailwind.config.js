/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif']
      }
    },
  },
  plugins: [],
}
