import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";
import eslintPluginPrettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      prettier: eslintPluginPrettier,
    },
    rules: {
      quotes: ["error", "double"],
      "no-unused-vars": [
        "error",
        {
          args: "after-used",
          ignoreRestSiblings: true,
          caughtErrors: "all",
        },
      ],
      semi: ["error", "always"],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      indent: ["warn", "tab"],
      "unused-imports/no-unused-imports": "error",
      "no-multiple-empty-lines": ["error", { max: 2 }],
      "no-var": "error",
      "no-undef": "error",
      "no-empty-function": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: false,
          tabWidth: 4,
          useTabs: true,
          trailingComma: "es5",
          printWidth: 80,
          arrowParens: "always",
        },
      ],
    },
  },
];

export default eslintConfig;
