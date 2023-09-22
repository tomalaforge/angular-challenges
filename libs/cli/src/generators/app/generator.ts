import {
  applicationGenerator,
  E2eTestRunner,
  UnitTestRunner,
} from '@nx/angular/generators';
import {
  formatFiles,
  generateFiles,
  names,
  readJsonFile,
  Tree,
  updateJson,
} from '@nx/devkit';
import { Linter } from '@nx/linter';
import { join } from 'path';
import { getProjectDir } from '../../utils/normalize';
import { Schema } from './schema';

export async function appGenerator(tree: Tree, options: Schema) {
  const { appDirectory } = getProjectDir(options.name, options.directory);

  const challengeNumberPath = 'challenge-number.json';
  const challengeNumber = readJsonFile(challengeNumberPath).total;

  await applicationGenerator(tree, {
    ...options,
    style: 'scss',
    routing: false,
    inlineStyle: true,
    inlineTemplate: true,
    prefix: 'app',
    unitTestRunner: options.addTest ? UnitTestRunner.Jest : UnitTestRunner.None,
    e2eTestRunner: E2eTestRunner.None,
    linter: Linter.EsLint,
    addTailwind: true,
    standalone: true,
    skipTests: true,
  });

  generateFiles(tree, join(__dirname, 'files', 'app'), appDirectory, {
    tmpl: '',
  });
  tree.delete(join(appDirectory, './src/app/nx-welcome.component.ts'));

  generateFiles(tree, join(__dirname, 'files', 'readme'), appDirectory, {
    tmpl: '',
    projectName: names(options.name).name,
    title: options.title,
    challengeNumber,
    docRepository: options.docRepository,
  });

  generateFiles(
    tree,
    join(__dirname, 'files', 'docs'),
    `./docs/src/content/docs/challenges/${options.docRepository}`,
    {
      tmpl: '',
      projectName: names(options.name).name,
      title: options.title,
      challengeNumber,
      difficulty: options.challengeDifficulty,
    }
  );

  if (options.addTest) {
    generateFiles(tree, join(__dirname, 'files', 'test'), appDirectory, {
      tmpl: '',
    });
  }

  updateJson(tree, challengeNumberPath, (json) => {
    json.total = json.total + 1;
    return json;
  });

  await formatFiles(tree);
}

export default appGenerator;
