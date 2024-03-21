module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react", "react-hooks", "jsx-a11y", "import", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": "warn",
    "react/prop-types": "off",
  },
};
