import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Only apply /lagom/ base when building for production (GitHub Pages).
  // Dev server keeps the root base so HMR and preview tools work normally.
  base: command === "build" ? "/lagom/" : "/",
  plugins: [react()],
}));
