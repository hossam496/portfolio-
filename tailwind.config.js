/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        display: ['3rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
      },
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
          muted: 'rgb(var(--surface-muted) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
          muted: 'rgb(var(--accent-muted) / <alpha-value>)',
        },
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 12px -2px rgb(0 0 0 / 0.06)',
        card: '0 1px 0 0 rgb(0 0 0 / 0.04), 0 8px 24px -4px rgb(0 0 0 / 0.08)',
        glow: '0 0 0 1px rgb(var(--accent) / 0.12), 0 12px 40px -12px rgb(var(--accent) / 0.35)',
      },
      backgroundImage: {
        'grid-soft':
          'linear-gradient(to right, rgb(var(--grid) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--grid) / 0.4) 1px, transparent 1px)',
        'hero-mesh':
          'radial-gradient(ellipse 80% 60% at 20% 0%, rgb(var(--accent) / 0.14), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 20%, rgb(147 51 234 / 0.1), transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgb(59 130 246 / 0.08), transparent 55%)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
