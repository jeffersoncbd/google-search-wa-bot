export default {
  roots: ['<rootDir>/src'],
  clearMocks: true,

  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/application.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/_domain/entities/_protocols/*',
    '!<rootDir>/src/_domain/entities/_services/*'
  ],
  coverageDirectory: '__tests__/coverage',
  coverageProvider: 'v8',

  testMatch: ['<rootDir>/__tests__/**/*.test.ts', '<rootDir>/src/**/*.spec.ts'],
  preset: 'ts-jest'
}
