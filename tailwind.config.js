/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'ring-teal-500',
    'text-deepBlue',
    'bg-deepBlue',
    'text-teal',
    'bg-teal',
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
