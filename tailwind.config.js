/** @type {import('tailwindcss').Config} */
export default {
  content: ["**/*.html"],
  theme: {
    extend: {
      backgroundPosition: {
        'leftbt': 'center left .5rem',
      },
      backgroundImage:{
        'email':'url(public/envelope-fill.svg)',
        'password':'url(public/lock-fill.svg)',
        'search':'url(public/search.svg)'
      },
      flex:{
        'img':'1 0 100%'
      },
      spacing: {
        'ws':'428px',
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

