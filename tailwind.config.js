/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      border: "var(--border)",
      "light-primary": "var(--light-primary)",

      background: "var(--background)",
      "surface-overlay": "var(--surface-overlay)",

      text: {
        primary: "var(--text-primary)",
        darker: "var(--text-darker)",
      },
    },
    borderRadius: {
      'md': '12px',
    }
    },
  },
  plugins: [],
}