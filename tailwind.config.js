/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf9f6',
        navy: '#1a1a3e',
        magenta: '#ff006e',
        saffron: '#ffbe0b',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
