import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './forbidden-enum';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [`type Difficulty = 'easy' | 'normal';`],
  invalid: [
    {
      code: `enum Difficulty { EASY = 'easy', NORMAL = 'normal', }`,
      errors: [{ messageId: 'forbidden-enum' }],
    },
  ],
});
