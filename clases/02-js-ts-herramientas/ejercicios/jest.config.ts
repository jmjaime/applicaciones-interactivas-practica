import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  transform: { "^.+\\.ts$": ["ts-jest", {}] },
  testMatch: ["**/src/**/*.spec.ts"],
  clearMocks: true,
};

export default config;
