/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/assets/styles/**/*.scss",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

