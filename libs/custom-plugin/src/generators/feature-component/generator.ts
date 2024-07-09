import {
  Tree,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
} from '@nx/devkit';
import * as path from 'path';
import { FeatureComponentGeneratorSchema } from './schema';

export async function featureComponentGenerator(
  tree: Tree,
  options: FeatureComponentGeneratorSchema,
) {
  const { fileName, className, name, propertyName } = names(options.name);

  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });

  const componentPath = options.inlineTemplate
    ? 'files/component/inline'
    : 'files/component/default';

  generateFiles(tree, path.join(__dirname, componentPath), projectRoot, {
    fileName,
    className,
    name,
    propertyName,
  });

  const storePath = options.createService
    ? 'files/store/service'
    : 'files/store/default';

  generateFiles(tree, path.join(__dirname, storePath), projectRoot, {
    fileName,
    className,
    name,
    propertyName,
  });

  await formatFiles(tree);
}

export default featureComponentGenerator;
