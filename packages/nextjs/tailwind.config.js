import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BASE_100_DARK,
  BASE_100_LIGHT,
  BASE_200_DARK,
  BASE_200_LIGHT,
  BASE_300_DARK,
  BASE_300_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  SECONDARY_TEXT_DARK,
  SECONDARY_TEXT_LIGHT,
} from "../../configuration/design";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: `${PRIMARY_TEXT_LIGHT}`,
          secondary: `${SECONDARY_TEXT_LIGHT}`,
          accent: `${SECONDARY_TEXT_LIGHT}`,
          neutral: "#212638",
          "base-100": `${BASE_100_LIGHT}`, // Navigation background
          "base-200": `${BASE_200_LIGHT}`, // App background
          "base-300": `${BASE_300_LIGHT}`, // Hover color
          "base-content": "#212638",
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",
          background: `${BACKGROUND_LIGHT}`,

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          primary: `${PRIMARY_TEXT_DARK}`,
          secondary: `${SECONDARY_TEXT_DARK}`,
          accent: `${SECONDARY_TEXT_DARK}`,
          neutral: "#F9FBFF",
          "base-100": `${BASE_100_DARK}`,
          "base-200": `${BASE_200_DARK}`,
          "base-300": `${BASE_300_DARK}`,
          "base-content": "#F9FBFF",
          info: "#385183",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",
          background: `${BACKGROUND_DARK}`,

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
