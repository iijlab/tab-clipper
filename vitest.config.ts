import { coverageConfigDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

const __dirname = import.meta.dirname;

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: __dirname,
      coverage: {
        provider: "v8",
        exclude: [
          ...coverageConfigDefaults.exclude,
          "src/browser/chrome/**",
          "src/browser/contracts/**",
        ],
      },
      globals: true,
      environment: "happy-dom",
      include: ["{src,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    },
  }),
);
