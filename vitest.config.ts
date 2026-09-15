import { coverageConfigDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: __dirname,
      coverage: {
        provider: "istanbul", // or 'v8'
        exclude: [
          ...coverageConfigDefaults.exclude,
          "src/extension/chrome/**",
          "src/ports/**",
        ],
      },
      globals: true,
      environment: "happy-dom",
      include: ["{src,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    },
  }),
);
