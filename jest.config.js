module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src/test',
  testPathIgnorePatterns: ['node_modules', '.+\.js'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
};
