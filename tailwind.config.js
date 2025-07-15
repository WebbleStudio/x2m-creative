/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Aggiungi qui altri percorsi se necessario, es. ./src/pages se usi anche la vecchia pages router
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['var(--font-raleway)', 'sans-serif'],
        'instrument-serif': ['var(--font-instrument-serif)', 'serif'],
        'degular-display': ['var(--font-degular-display)', 'sans-serif'],
        sprat: ['var(--font-sprat)', 'serif'],
      },
      colors: {
        'main-black': '#0c0c0c',
        'main-white': '#ffffff',
        'creative-blue': '#3487F4',
      },
      screens: {
        'xs': '360px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1366px',
        '2xl': '1920px',
      },
      animation: {
        'gradient-text': 'gradientText 5s ease infinite',
        'bounce-custom': 'bounceCustom 2s infinite',
        'breathing': 'breathing 2s ease-in-out infinite',
      },
      keyframes: {
        gradientText: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        bounceCustom: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
        breathing: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.9'
          },
          '50%': { 
            transform: 'scale(1.05)',
            opacity: '1'
          },
        },
      },
    },
  },
  plugins: [],
}

module.exports = config
