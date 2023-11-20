/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/assets/styles/**/*.scss",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EFF5F5',
        secondary: '#6C8B95',
        thirdly: '#85BE63'
      }
    },
  },
  plugins: [],
}
