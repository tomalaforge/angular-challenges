import { libraryGenerator, UnitTestRunner } from '@nx/angular/generators';
import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
  updateJson,
} from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { join } from 'path';
import { CustomLibraryGeneratorSchema } from './schema';

export async function customLibraryGenerator(
  tree: Tree,
  options: CustomLibraryGeneratorSchema,
) {
  await libraryGenerator(tree, options);
  const { fileName } = names(options.name);

  // I really needed https://medium.com/ngconf/extending-an-existing-nx-generator-4ae0e7b53484
  // to do this.

  // UnitTestRunner.Jest is the default
  if (options.unitTestRunner === UnitTestRunner.Jest) {
    const projectConfig = readProjectConfiguration(tree, fileName);

    tree.delete(join(projectConfig.root, './jest-config.ts'));

    generateFiles(
      tree,
      joinPathFragments(__dirname, 'jest'),
      projectConfig.root,
      {
        tmpl: '',
        project: fileName,
        offsetFromRoot: offsetFromRoot(projectConfig.root),
      },
    );
  }

  // Linter.EsLint is the default
  if (options.linter === Linter.EsLint) {
    updateJson(tree, `libs/${fileName}/.eslintrc.json`, (json) => {
      json.overrides[0].rules = {
        ...json.overrides[0].rules,
        '@typescript-eslint/member-ordering': 'off',
      };
      return json;
    });
  }

  await formatFiles(tree);
}

export default customLibraryGenerator;
