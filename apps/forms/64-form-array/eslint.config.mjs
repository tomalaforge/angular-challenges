import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';
const craftRules = require('@craft-ng/dev-tools/eslint-rules');

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
     plugins: {
      'craft-ng': craftRules,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'craft-ng/brand-angular-gen-deps-required': 'error',
      'craft-ng/no-angular-inject': 'error',
      'craft-ng/prefer-craft-http-client': 'error',
      'craft-ng/prefer-craft-service': 'error',
      'craft-ng/prefer-browser-boundaries': 'error',
      'craft-ng/app-start-registry-match': 'error',
      'craft-ng/brand-angular-deps-match': 'error',
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
