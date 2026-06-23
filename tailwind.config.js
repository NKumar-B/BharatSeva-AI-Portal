/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0f172a',      // Primary deep corporate tone
          blue: '#1e3a8a',      // Secondary brand blue
          saffron: '#ea580c',   // Traditional dynamic accent
          emerald: '#059669',   // Success metrics
          slate: '#f8fafc'      // Premium background slate
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Professional, clean typography
      }
    },
  },
  plugins: [],
}