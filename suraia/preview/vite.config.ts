import { defineConfig } from "vite";

export default defineConfig({
  root: "preview",
  server: {
    fs: {
      allow: ["..", "../source"],
    },
    open: false,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
