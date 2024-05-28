/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        shake: "shake infinite 5s  ease-in-out",
      },
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
