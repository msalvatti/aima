module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.ts"
    ]
};
