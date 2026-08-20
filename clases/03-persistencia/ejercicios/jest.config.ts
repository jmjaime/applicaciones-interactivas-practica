import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  verbose: true,
};

export default config;
