import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "Fetch_ui",
  build: {
    outDir: "build", // Change output folder to "build"
  },
});
