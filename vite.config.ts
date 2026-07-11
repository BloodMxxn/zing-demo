import path from "path";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/zing-demo/",
  plugins: [react(), tailwindcss(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
