/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        soft: 'rgb(var(--color-soft) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        ink: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-text-light) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        whatsapp: 'rgb(var(--color-whatsapp) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -8px rgba(27, 79, 114, 0.18)',
        lift: '0 18px 40px -16px rgba(27, 79, 114, 0.28)',
        glow: '0 0 0 0 rgba(240, 180, 41, 0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(240, 180, 41, 0.55)' },
          '70%': { boxShadow: '0 0 0 14px rgba(240, 180, 41, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(240, 180, 41, 0)' },
        },
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.5)' },
          '50%': { boxShadow: '0 0 0 10px rgba(37, 211, 102, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        'pulse-soft': 'pulse-soft 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
