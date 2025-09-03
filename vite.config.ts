import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    open: true,
    port: 4200,
  },
  build: {
    target: "es2020",
  },
});
