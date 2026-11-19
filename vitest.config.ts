import path from "node:path";
import { defineConfig } from "vitest/config";

// Testes automáticos: rode com `npm test`.
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
  test: {
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
