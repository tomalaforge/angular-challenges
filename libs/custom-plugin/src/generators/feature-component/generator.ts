import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { FeatureComponentGeneratorSchema } from './schema';

export async function featureComponentGenerator(
  tree: Tree,
  options: FeatureComponentGeneratorSchema,
) {
  const componentNames = names(options.name);
  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files/component'), projectRoot, {
    ...componentNames,
    createService: options.createService,
    inlineTemplate: options.inlineTemplate,
    tmpl: '',
  });

  if (options.createService) {
    generateFiles(tree, path.join(__dirname, 'files/service'), projectRoot, {
      ...componentNames,
      tmpl: '',
    });
  }

  if (!options.inlineTemplate) {
    generateFiles(tree, path.join(__dirname, 'files/template'), projectRoot, {
      ...componentNames,
      tmpl: '',
    });
  }

  await formatFiles(tree);
}

export default featureComponentGenerator;
