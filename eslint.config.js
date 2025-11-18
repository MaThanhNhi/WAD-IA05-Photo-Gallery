// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 1. Lint JS + TS
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser, 
      parserOptions: { project: true },
      globals: {
        ...globals.browser,
        ...globals.node,    
      },
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
    },

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.recommended,
      eslintConfigPrettier,        
    ],

    rules: {
      "react/react-in-jsx-scope": "off", // Vite + React 17+ không cần import React
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];
