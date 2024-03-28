/** @type {import('tailwindcss').Config} */
export default {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './app/**/*.{html,js,ts,jsx,tsx}',
    "./src/assets/styles/**/*.scss",
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EFF5F5',
        secondary: '#6C8B95',
        thirdly: '#85BE63',
        thirdlyh: '#5b8a3f'
      },
      height: {
        '90h': '90vh',
        '80h': '80vh',
        '70h': '70vh',
        '60h': '60vh',
        '50h': '50vh',
        '40h': '40vh',
        '30h': '30vh',
        '80%': '80%',
        '70%': '70%',
        '60%': '60%',
      },
      width: {
        '40w': '40vw',
        '50w': '50vw',
        '60w': '60vw',
        '70w': '70vw',
        '80w': '80vw',
        '90w': '90vw',
        '95w': '95vw',
        '95%': '95%',
      },
      backgroundImage: {
        'loginBG': "url('@/assets/images/bg.webp')"
      }
    },
  },
}