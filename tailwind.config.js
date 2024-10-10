/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(1.5px, -1.5px)' },
          '20%': { transform: 'translate(-1.5px, 1px)' },
          '30%': { transform: 'translate(2.5px, -1px)' },
          '40%': { transform: 'translate(-2.5px, 2.5px)' },
          '50%': { transform: 'translate(1.5px, 1.5px)' },
          '60%': { transform: 'translate(-1.5px, -1.5px)' },
          '70%': { transform: 'translate(2px, -2px)' },
          '80%': { transform: 'translate(-2px, 2px)' },
          '90%': { transform: 'translate(1px, 1px)' },
        },
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
