/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        xs:'520px'
      }
    },
    fontFamily:{
      sans:['Public Sans', 'sans-serif']
    }
  },
  plugins: [],
}
