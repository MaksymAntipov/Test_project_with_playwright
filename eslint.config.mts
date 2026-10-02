import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 1. Базовые настройки JS и TypeScript
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // 2. Рекомендуемые настройки для Playwright
  playwright.configs["flat/recommended"],
  
  // 3. Твои кастомные правила
  {
    files: ["**/*.{ts,mts,cts,js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "playwright/expect-expect": "error",
      "playwright/no-wait-for-timeout": "error",
      "playwright/no-focused-test": "error",
      "@typescript-eslint/no-explicit-any": "warn"
    },
  },
  
  // 4. Prettier всегда должен быть в самом конце массива!
  eslintConfigPrettier
];