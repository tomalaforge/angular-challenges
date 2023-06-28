import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
} from '@nx/devkit';
import { FeatureComponentGeneratorSchema } from './schema';
import { normalizeNameAndPaths } from './utils';

export async function featureComponentGenerator(
  tree: Tree,
  options: FeatureComponentGeneratorSchema
) {
  const componentNames = names(options.name);

  const directory = normalizeNameAndPaths(tree, options);

  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files/component'),
    directory,
    {
      fileName: componentNames.fileName,
      className: componentNames.className,
      propertyName: componentNames.propertyName,
      name: componentNames.name,
      inlineTemplate: options.inlineTemplate,
      createService: options.createService,
      tpl: '',
    }
  );

  if (!options.inlineTemplate) {
    generateFiles(
      tree,
      joinPathFragments(__dirname, 'files/template'),
      directory,
      {
        fileName: componentNames.fileName,
        tpl: '',
      }
    );
  }

  if (options.createService) {
    generateFiles(
      tree,
      joinPathFragments(__dirname, 'files/service'),
      directory,
      {
        fileName: componentNames.fileName,
        className: componentNames.className,
        name: componentNames.name,
        tpl: '',
      }
    );
  }

  await formatFiles(tree);
}

export default featureComponentGenerator;
