/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'text-deepBlue',
    'bg-deepBlue',
    'text-teal',
    'bg-teal',
    'ring-teal-500',
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
