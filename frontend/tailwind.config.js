/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container:{
      center: true,
      padding: {
        sm:"1rem",
        lg:"5rem",
        DEFAULT:"0.5rem"
      },
    },
  },
  plugins: [],
}