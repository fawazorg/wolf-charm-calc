import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  jsdoc.configs["flat/recommended"],
  prettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        URL: "readonly",
      },
    },
    rules: {
      "jsdoc/require-description": "warn",
      "jsdoc/require-param-description": "warn",
      "jsdoc/require-returns-description": "warn",
      "jsdoc/check-param-names": "error",
      "jsdoc/check-types": "error",
      "jsdoc/tag-lines": ["warn", "any"],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
