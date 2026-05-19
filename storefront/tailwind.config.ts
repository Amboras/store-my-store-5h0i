import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        /* Brand tokens */
        brand: {
          navy: '#0B1F3A',
          'navy-dark': '#061227',
          'navy-light': '#1B3458',
          coral: '#FF6849',
          'coral-dark': '#E84F30',
          'coral-light': '#FF8A70',
          cream: '#FAF7F0',
          'cream-dark': '#F1ECE0',
          'cream-deep': '#E8E3D5',
          ink: '#0B1F3A',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display':    ['clamp(2.75rem, 6vw, 5rem)',     { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(3.25rem, 7.5vw, 6.5rem)', { lineHeight: '0.96', letterSpacing: '-0.03em'  }],
        'h1': ['clamp(2rem, 4vw, 3rem)',      { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h3': ['1.5rem',  { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h4': ['1.25rem', { lineHeight: '1.35' }],
      },
      maxWidth: {
        'content': '1280px',
      },
      spacing: {
        'section':    '6rem',
        'section-sm': '3rem',
      },
      borderRadius: {
        'pill': '9999px',
        'soft': '1rem',
      },
      keyframes: {
        'fade-in':        { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-up':     { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'slide-in-right': { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        'slide-out-right':{ '0%': { transform: 'translateX(0)' },    '100%': { transform: 'translateX(100%)' } },
        'marquee':        { 'from': { transform: 'translateX(0)' },  'to': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'fade-in':        'fade-in 0.5s ease-out',
        'fade-in-up':     'fade-in-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-out-right':'slide-out-right 0.3s ease-out',
        'marquee':        'marquee 30s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
