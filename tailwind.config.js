/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0A0A0A',
          card: '#121212',
          lighter: '#1A1A1A',
          border: 'rgba(245, 245, 240, 0.1)',
        },
        bone: {
          DEFAULT: '#F5F5F0',
          dim: '#A3A39B',
          muted: '#666660',
        },
        crimson: {
          DEFAULT: '#E10600',
          dark: '#B00500',
          glow: 'rgba(225, 6, 0, 0.4)',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}
