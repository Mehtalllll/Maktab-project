/** @type {import('tailwindcss').Config} */
export default {
  content: ["**/*.html"],
  theme: {
    extend: {
      spacing: {
        'ws':'430px',
        'hs':'926px',
        'wl':'30px',
        'wb':'380px'
      },
      fontFamily:{
        "inter":['Inter', 'sans-serif']
      },
      colors:{
        'text':'#000000',
        'but':'#212529'
      }
    },
  },
  plugins: [],
}

