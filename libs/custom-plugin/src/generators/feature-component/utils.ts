import {
  Tree,
  joinPathFragments,
  normalizePath,
  readProjectConfiguration,
} from '@nx/devkit';
import { FeatureComponentGeneratorSchema } from './schema';

export function normalizeNameAndPaths(
  tree: Tree,
  options: FeatureComponentGeneratorSchema
) {
  const { root, sourceRoot, projectType } = readProjectConfiguration(
    tree,
    options.project
  );

  const projectSourceRoot = sourceRoot ?? joinPathFragments(root, 'src');
  const { name, path: namePath } = parseNameWithPath(options.name);

  const path =
    options.path ??
    joinPathFragments(
      projectSourceRoot,
      projectType === 'application' ? 'app' : 'lib',
      namePath
    );

  return joinPathFragments(path, name);
}

export function parseNameWithPath(rawName: string) {
  const parsedName = normalizePath(rawName).split('/');
  const name = parsedName.pop();
  const path = parsedName.join('/');

  return { name, path };
}
