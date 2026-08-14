import angular from 'angular-eslint';
import jsoncParser from 'jsonc-eslint-parser';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@angular-eslint': angular.tsPlugin,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'type:hlm',
              onlyDependOnLibsWithTags: ['type:core'],
            },
            {
              sourceTag: 'type:brain',
              onlyDependOnLibsWithTags: ['type:core'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // @typescript-eslint/no-extra-semi was removed; the core rule now supports TS syntax.
      'no-extra-semi': 'error',
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
  },
];
