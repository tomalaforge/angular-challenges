export default {
  displayName: 'crud',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/apps/crud',
  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};
