/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EB4700',
        dark: '#1E1E1E',
        light: '#F1F1F1',
      },
      fontFamily: {
        'gasoek': ['var(--font-gasoek)'],
        'inter': ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
} 