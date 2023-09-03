import {
  rule as forbiddenEnum,
  RULE_NAME as forbiddenEnumName,
} from './rules/forbidden-enum';

module.exports = {
  rules: { [forbiddenEnumName]: forbiddenEnum },
};
