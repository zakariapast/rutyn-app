/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        deepBlue: '#2A4D8E',
        teal: '#1ABC9C',
      },
    },
  },
  plugins: [],
};
