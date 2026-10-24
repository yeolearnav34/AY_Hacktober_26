/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
          // Brand forest green
          DEFAULT: '#1e4d2b',
          dark: '#14381e',
          light: '#2d6a4f',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ece0',
          300: '#ece0cf',
          400: '#dfcdb7',
          500: '#d1b89d',
          DEFAULT: '#faf6ee',
        },
        harvest: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          DEFAULT: '#eab308',
        },
        earth: {
          800: '#382e2b',
          900: '#27201e',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 56, 30, 0.06), 0 2px 6px -1px rgba(20, 56, 30, 0.04)',
        'card': '0 10px 30px -4px rgba(20, 56, 30, 0.08), 0 4px 10px -2px rgba(20, 56, 30, 0.03)',
        'lifted': '0 20px 35px -5px rgba(20, 56, 30, 0.12), 0 8px 12px -4px rgba(20, 56, 30, 0.06)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(-5px)' },
          '75%': { transform: 'translateY(-2px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
