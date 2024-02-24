import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironmentOptions: {
        serverPort: 8081
    },
    moduleNameMapper: {
        "@cpp/(.*)": "<rootDir>/build/Release/$1"
    }
};

export default config;

