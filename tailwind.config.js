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
      colors: {
        "beige-100": "#f8f4f0",
        "beige-500": "98908B",
        "grey-900": "#201f24",
        "grey-500": "#696868",
      },
      boxShadow: {
        around: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
