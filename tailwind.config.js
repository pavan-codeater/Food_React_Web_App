/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": { transform: "translate(0p)" },

          "10%": { transform: "translateX(5px)" },

          "20%": { transform: "translateX(5px)" },

          "30%": { transform: "translateX(-3px)" },

          "40%": { transform: "translateX(3px)" },

          "50%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        "shake-slide": "refine 2s infinite",
      },
    },
  },
};
