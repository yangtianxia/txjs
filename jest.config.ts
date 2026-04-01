// 根目录 jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/packages/*/tests/**/*.test.ts',
    '<rootDir>/packages/*/tests/**/*.spec.ts',
  ],
  moduleNameMapper: {
    '^@txjs/bem(.*)$': '<rootDir>/packages/bem/src$1',
    '^@txjs/bool(.*)$': '<rootDir>/packages/bool/src$1',
    '^@txjs/shared(.*)$': '<rootDir>/packages/shared/src$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
}

export default config
