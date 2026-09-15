import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  sortPackageJson: false,
  ignorePatterns: [
    // *add*
    "*.config.[jt]s",
    "**/.idea/**",
    "**/.vscode/**",
    "**/coverage/**",
    "**/dist/**",
    "**/node_modules/**",
    "pnpm-*.yaml",
    "tsconfig*.json",
  ],
});
