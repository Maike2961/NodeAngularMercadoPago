/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      'backgroundColor': {
        'gray': '#18181b'
      },
      'boxShadow':{
        'custom': '0px 5px 0 rgba(0, 0, 0, 0.60), 0px 0px 2px rgba(0, 0, 0, 0.25), 0px 5px 0 rgba(0, 0, 0, 0.60)'
      }
    },
  },
  plugins: [],
}

