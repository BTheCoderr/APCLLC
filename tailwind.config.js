/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1220',
          mid: '#121A2B',
          deep: '#070B14',
        },
        paper: '#F7F5F0',
        ink: '#141820',
        muted: '#5E6773',
        primary: '#c62a2a',
        'primary-dark': '#9e1f1f',
        secondary: '#0B1220',
        accent: '#d4b14b',
        'accent-dark': '#b99537',
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'var(--font-source-sans)', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        card: '0 12px 40px -18px rgba(11, 18, 32, 0.35)',
      },
    },
  },
  plugins: [],
};
