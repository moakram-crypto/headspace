import type { Config } from "tailwindcss";

// Same brand palette as the mobile app (src/config/theme.ts) — kept in sync
// so the admin panel and app feel like one product.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF4EC",
        coral: { DEFAULT: "#C97064", dark: "#B25A50" },
        lavender: "#B9A6DC",
        navy: "#1F2A44",
        muted: "#6B7280",
        success: "#7FB77E",
        warn: "#E8B04B",
        danger: "#D9695F",
        borderc: "#EDE2D3",
        sleepbg: "#12172B",
        sleepcard: "#232A4D",
        sleepgold: "#E8C468",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
