import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fondos — de más oscuro a más claro
        dark:    '#0D0D0B',
        dark2:   '#141412',
        dark3:   '#1C1C19',
        dark4:   '#242420',
        // Texto
        text:        '#E8E6DF',
        'text-dim':  '#8A8880',
        'text-dimmer': '#555450',
        // Acento ámbar
        amber:       '#EF9F27',
        'amber-dim': '#BA7517',
        // Estado
        terminal:    '#22c55e',
      },
      fontFamily: {
        mono:  ['DM Mono', 'monospace'],
        sans:  ['DM Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      maxWidth: {
        content: '900px',
      },
      animation: {
        'scroll-left': 'scrollLeft 28s linear infinite',
        'blink': 'blink 2s infinite',
      },
      keyframes: {
        scrollLeft: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}

export default config
