import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050510",
        neonBlue: "#00F0FF",
        electricPurple: "#7B2EFF",
        cyberPink: "#FF2FD1",
        aiGreen: "#00FF9C",
        textMain: "#EAEAEA"
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 240, 255, 0.4)",
        cyber: "0 0 30px rgba(123, 46, 255, 0.35)"
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
