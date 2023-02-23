/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode:'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        gray: colors.neutral,
        'flow': {
          100:'#CBFED4',
          200:'#98FDB4',
          300:'#64FA9D',
          400:'#3DF596',
          500:'#00ef8b',
          600:'#00CD8C',
          700:'#00AC86',
          800:'#008A7A',
          900:'#007270',
        },
      }
    },
  },
  plugins: [],
}
