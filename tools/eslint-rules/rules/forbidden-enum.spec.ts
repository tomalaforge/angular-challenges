import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './forbidden-enum';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [`const toto = 'TOTO'`],
  invalid: [
    {
      code: `const enum Toto { TOTO = 'Toto'};`,
      errors: [{ messageId: 'forbiddenEnum' }],
    },
  ],
});
