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
        thirdly: '#85BE63',
        thirdlyh: '#5b8a3f'
      },
      height: {
        '90': '90vh',
        '80vh': '90vh',
        '70vh': '90vh',
        '80%': '80%',
        '70%': '70%',
        '60%': '60%',
      },
      width: {
        '80w': '80vw',
        '90w': '90vw',
      },
      backgroundImage: {
        'loginBG': "url('@/assets/images/bg.webp')"
      }
    },
  },
  plugins: [],
}

