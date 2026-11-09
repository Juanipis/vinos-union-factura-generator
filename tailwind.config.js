/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--primary-color)',
          secondary: 'var(--secondary-color)',
        },
      },
    },
  },
  plugins: [],
}
