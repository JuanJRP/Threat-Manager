import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cPurple: {
          50: "#fbf6fe",
          100: "#f5eafd",
          200: "#ecd9fb",
          300: "#debaf8",
          400: "#c98ef2",
          500: "#af59e8",
          600: "#a042db",
          700: "#8a31bf",
          800: "#742c9d",
          900: "#5f257e",
          950: "#410f5c",
        },
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake, sunset, dim"],
  },
  plugins: [require("daisyui")],
};
export default config;
