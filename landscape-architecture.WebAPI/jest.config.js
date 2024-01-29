/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    serverPort: 8081,
  },
  roots: [
    '<rootDir>/tests',
  ]
};