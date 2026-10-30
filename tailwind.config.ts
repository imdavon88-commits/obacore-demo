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
        ink: "#0a0a0a",
        cream: "#f5f0e6",
        gold: {
          DEFAULT: "#d4af37",
          dim: "#a8892a",
        },
        card: "#141414",
        muted: "#8a8578",
      },
      maxWidth: {
        phone: "390px",
      },
    },
  },
  plugins: [],
};
export default config;
