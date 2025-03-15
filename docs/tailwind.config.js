/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'], // Support Docusaurus dark mode
  corePlugins: {
    preflight: false, // Disable Tailwind's reset
  },
  // Important to prevent conflicts with Docusaurus styles
  important: false,
}; 