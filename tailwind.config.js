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
    'text-brandTeal',
    'bg-brandTeal',
  ],
  theme: {
    extend: {
      colors: {
        deepBlue: '#2A4D8E',
        brandTeal: '#1ABC9C',
      },
    },
  },
  plugins: [],
};
