import { defineConfig } from "vite";
import { resolve } from "node:path";

const __dirname = import.meta.dirname;

export default defineConfig({
  root: "src",
  publicDir: resolve(__dirname, "public"),
  build: {
    license: { fileName: "THIRD-PARTY-LICENSES" },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rolldownOptions: {
      input: {
        "service-worker": "service-worker/index.ts",
        "offscreen": "offscreen.html",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": __dirname,
    },
  },
});
