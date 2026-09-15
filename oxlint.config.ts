import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    // *modify*
    typeAware: true,
    typeCheck: true,
  },
  env: {
    // *add*
    browser: true,
    builtin: true,
    webextensions: true,
  },
  plugins: [
    // *default*
    "eslint",
    "oxc",
    "typescript",
    "unicorn",
    // *recommended*
    "import",
  ],
  categories: {
    // *default*
    correctness: "warn",
    suspicious: "allow",
    pedantic: "allow",
    style: "allow",
    perf: "allow",
    restriction: "allow",
    nursery: "allow",
  },
  rules: {
    // *recommended*
    "no-console": "warn",
    "typescript/no-explicit-any": "warn",
    // plugins: import
    "import/no-duplicates": "warn",
    "import/no-self-import": "error",
    "import/no-cycle": "warn",
    // options: type-aware
    "typescript/await-thenable": "error",
    "typescript/no-floating-promises": "error",
  },
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
