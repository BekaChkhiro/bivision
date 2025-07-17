/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './templates/**/*.{html,php}',
    './parts/**/*.{html,php}',
    './*.php',
    './build/**/*.{js,css}' // Add build directory to catch compiled files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to prevent conflicts with editor styles
  },
}