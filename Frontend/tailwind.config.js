/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
    colors:{
      primary: '#1e3a8a',
      secundary:'#ffffff',
      third: '#000000',
      danger: '#8C030E'
    },
  },
  plugins: [],
}