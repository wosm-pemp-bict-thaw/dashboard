import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff69b4',
      },
      fontFamily: {
        mono: ['monospace', 'ui-monospace', 'SFMono-Regular'],
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
