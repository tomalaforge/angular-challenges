import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './forbidden-enum';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `type Currency = 'USD' | 'EUR';`,
    `type Difficulty = 'easy' | 'normal';`,
  ],
  invalid: [
    {
      code: `const enum Currency { USD = 'USD', EUR = 'EUR'};`,
      errors: [{ messageId: 'forbiddenEnum' }],
    },
    {
      code: `enum Difficulty { EASY = 'easy', NORMAL = 'normal'};`,
      errors: [{ messageId: 'forbiddenEnum' }],
    },
  ],
});
