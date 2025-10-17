module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\.(js)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(test|spec).{js,jsx}',
    '<rootDir>/src/**/?(*.)(test|spec).{js,jsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/setupTests.js',
    '!src/**/*testUtils*'
  ]
};
