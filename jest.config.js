/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  rootDir: "./src",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^__mocks__(.*)$": "./__mocks__/$1",
    "^@/(.*)$": "<rootDir>/$1",
    "^.+\\.(css|sass|scss)$": "./__mocks__/styleMock.js",
  },
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/*.types.ts",
    "!jest.config.js",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/dist/**",
  ],
  coverageReporters: ["text", "lcov", "cobertura"],
  setupFiles: ['../jest.polyfills.js'],
  setupFilesAfterEnv: ["../jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { isolatedModules: true, tsconfig: "tsconfig.jest.json" },
    ],
  },
  globals: {
    fetch: global.fetch,
  },
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
