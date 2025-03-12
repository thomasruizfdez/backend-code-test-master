// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
      extends: ["plugin:@typescript-eslint/recommended"],
      languageOptions: {
        ecmaVersion: 2018,
      },
      rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-inferrable-types": [
          "warn",
          {
            "ignoreParameters": true
          }
        ],
        "@typescript-eslint/no-unused-vars": "warn"
      },
      ignores: [
        "dist/*",
        "coverage/*",
        "**/*.d.ts",
        "/src/public/",
        "/src/types/"
      ]
    }
]);

