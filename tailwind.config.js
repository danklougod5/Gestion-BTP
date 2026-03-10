/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btp-primary': 'var(--color-primary)',
        'btp-secondary': 'var(--color-secondary)',
        'btp-cta': 'var(--color-cta)',
        'btp-background': 'var(--color-background)',
        'btp-text': 'var(--color-text)',
        'btp-accent-green': 'var(--color-accent-green)',
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
