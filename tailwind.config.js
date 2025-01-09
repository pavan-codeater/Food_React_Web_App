/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": { transform: "translate(0px)" },

          "10%": { transform: "translateX(-10px)" },

          "20%": { transform: "translateX(10px)" },

          "30%": { transform: "translateX(-30px)" },

          "40%": { transform: "translateX(30px)" },

          "50%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
      },
    },
  },
};
