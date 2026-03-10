/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btp-primary': '#64748B',
        'btp-secondary': '#94A3B8',
        'btp-cta': '#F97316',
        'btp-background': '#F8FAFC',
        'btp-text': '#334155',
        'btp-accent-green': '#10B981',
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
