import { Tree, updateJson } from '@nx/devkit';
import { LintProjectSchema } from './schema';

export function updateLintFiles(tree: Tree, options: LintProjectSchema) {
  const eslintPath = `${options.lintFilePath}/.eslintrc.json`;

  updateJson(tree, eslintPath, (json) => {
    json.overrides[0].rules = {
      ...json.overrides[0].rules,
      '@typescript-eslint/member-ordering': 'off',
    };
    return json;
  });
}
