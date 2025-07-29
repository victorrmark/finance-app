/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "preset-1": "2rem",
        "preset-2": "1.25rem",
        "preset-3": "1rem",
        "preset-4": "0.875rem",
        "preset-5": "0.75rem",
      },
    }
  },
  plugins: [],
};
