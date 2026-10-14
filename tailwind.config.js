/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        p5: {
          black: '#070709',
          panel: '#101014',
          red: '#E60012',
          crimson: '#B8000E',
          cyan: '#00F0FF',
          white: '#F8F8F8',
          muted: '#A0A0AB',
        },
      },
      fontFamily: {
        display: ['Anton', 'Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'p5-red': '6px 6px 0px 0px #E60012',
        'p5-white': '6px 6px 0px 0px #F8F8F8',
        'p5-cyan': '6px 6px 0px 0px #00F0FF',
        'p5-dark': '8px 8px 0px 0px #000000',
      },
    },
  },
  plugins: [],
};