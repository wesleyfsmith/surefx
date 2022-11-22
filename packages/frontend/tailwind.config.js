module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "primary": "#0090FF",
          "neutral": "#00101a",
          "accent": "#264d6a"
          // "base-100": '#333333'
        },
      }
    ]
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')]
};
