/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'carbon': {
          50: '#f8faf6',
          100: '#f0f3ec',
          200: '#e1e8d9',
          300: '#d2dcc6',
          400: '#b4cba0',
          500: '#96ba7a',
          600: '#7aa962',
          700: '#5d824a',
          800: '#406b3a',
          900: '#2a512a',
          950: '#1a3118',
        },
        'emerald-glow': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
      },
      backdropFilter: {
        'none': 'none',
        'sm': 'blur(4px)',
        'md': 'blur(12px)',
        'lg': 'blur(20px)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Cal Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-lg': '0 0 40px rgba(34, 197, 94, 0.2)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
