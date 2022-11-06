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
          "primary": "#18A0FB",
          "neutral": "#333333",
          "accent": "#545454"
          // "base-100": '#333333'
        },
      }
    ]
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')]
};
