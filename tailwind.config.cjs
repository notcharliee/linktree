const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        primary: "rgb(255 255 255)",
        secondary: "rgb(9 9 11)",
      },
      animation: {
        "hue-rotate": "hue-rotate 3s infinite linear",
      },
      keyframes: {
        "hue-rotate": {
          from: { filter: "hue-rotate(1deg)" },
          to: { filter: "hue-rotate(365deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
