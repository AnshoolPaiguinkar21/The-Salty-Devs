import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',         // Use ts-jest to handle TypeScript
  testEnvironment: 'node',   // Node environment
  testMatch: ['**/*.test.ts'], // Match all test files ending with .test.ts
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Supported file extensions
  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Use your tsconfig
    },
  },
   collectCoverage: true,
};

export default config;
