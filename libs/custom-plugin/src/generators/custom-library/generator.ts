import { libraryGenerator } from '@nx/angular/generators';
import { Tree, extractLayoutDirectory, formatFiles, names } from '@nx/devkit';
import { Linter } from '@nx/linter';
import { createJestFiles } from './jest/create-files';
import { updateLintFiles } from './lint/update-files';
import { LibraryGeneratorSchema } from './schema';

export async function customLibraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema
) {
  await libraryGenerator(tree, options);
  const name = names(options.name).fileName;

  const { projectDirectory } = extractLayoutDirectory(options.directory);

  const fullProjectDirectory = projectDirectory
    ? `${names(projectDirectory).fileName}/${name}`.replace(/\/+/g, '/')
    : name;
  const projectName = fullProjectDirectory
    .replace(new RegExp('/', 'g'), '-')
    .replace(/-\d+/g, '');

  if (options.unitTestRunner === 'jest') {
    await createJestFiles(tree, { project: projectName });
  }

  if (options.linter !== Linter.None) {
    await updateLintFiles(tree, {
      lintFilePath: `libs/${projectName}`,
    });
  }

  await formatFiles(tree);
}

export default customLibraryGenerator;
