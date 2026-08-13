import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Express exige la firma (err, req, res, next) en el error handler
      // aunque no siempre se usen todos los parámetros — permitir "_" como
      // convención explícita de "a propósito no lo uso", no error de lint.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
);
