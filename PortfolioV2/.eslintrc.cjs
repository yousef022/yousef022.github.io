module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: { react: { version: "detect" } },
  rules: {
    // prefer arrow functions
    "func-style": ["error", "expression"],
    "prefer-arrow-callback": "error",
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
    ],

    // practical TS/React
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
