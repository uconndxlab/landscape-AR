import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironmentOptions: {
        serverPort: 8081
    },
    moduleNameMapper: {
        "@cpp/(.*)": "<rootDir>/build/Release/$1"
    },
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*.?([mc])[t]s?(x)", "**/?(*.)+(spec|test).?([mc])[t]s?(x)" ]
};

export default config;

