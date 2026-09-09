import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "node",
  transform: { "^.+\\.ts$": ["ts-jest", {}] },
  testMatch: ["**/__tests__/**/*.spec.ts"],
};
export default config;
