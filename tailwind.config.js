/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Montserrat", "Open Sans", "Poppins", "Cairo"],
        body: ["Cairo", "sans-serif"],
      },
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        background: "hsl(var(--background))",
        seconBackground: "hsl(var(--seconBackground))",
      },
    },
  },
  plugins: [],
};
