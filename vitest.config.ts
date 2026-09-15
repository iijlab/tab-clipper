import { coverageConfigDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: "istanbul", // or 'v8'
        exclude: [...coverageConfigDefaults.exclude],
      },
      globals: true,
      environment: "happy-dom",
      setupFiles: ["./vitest.setup.ts"],
      include: ["{src,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    },
  }),
);
