/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'padel-teal': '#14B8A6',
        'padel-teal-dark': '#0D9488',
        'padel-teal-light': '#5EEAD4',
        'padel-cyan': '#06B6D4',
        'padel-cyan-light': '#22D3EE',
        'padel-bg': '#FFFFFF',
        'padel-bg-light': '#F9FAFB',
        'padel-gray': '#F3F4F6',
        'padel-gray-dark': '#E5E7EB',
        'padel-text': '#111827',
        'padel-text-light': '#6B7280',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-teal': 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
        'gradient-fresh': 'linear-gradient(to bottom, #FFFFFF, #F9FAFB)',
      }
    },
  },
  plugins: [],
}
