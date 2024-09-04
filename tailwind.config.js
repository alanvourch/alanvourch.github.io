// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInLeft: 'fadeInLeft 1s ease-out forwards',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
