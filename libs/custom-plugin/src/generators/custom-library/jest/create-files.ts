import {
  generateFiles,
  joinPathFragments,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import { join } from 'path';
import { JestProjectSchema } from './schema';

export function createJestFiles(tree: Tree, options: JestProjectSchema) {
  const projectConfig = readProjectConfiguration(tree, options.project);

  tree.delete(join(projectConfig.root, './jest-config.ts'));

  generateFiles(
    tree,
    joinPathFragments(__dirname, 'file'),
    projectConfig.root,
    {
      tmpl: '',
      project: options.project,
      offsetFromRoot: offsetFromRoot(projectConfig.root),
    }
  );

  tree.delete(join(projectConfig.root, './src/test-setup.ts'));
}
