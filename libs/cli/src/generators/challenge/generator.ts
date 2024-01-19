import {
  applicationGenerator,
  E2eTestRunner,
  UnitTestRunner,
} from '@nx/angular/generators';
import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  updateJson,
} from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { join } from 'path';
import { getProjectDir } from '../../utils/normalize';
import { Schema } from './schema';

function findPreviousChallengeFilePath(tree, path, number) {
  if (tree.isFile(path) && path.startsWith(`${number}-`)) {
    return path;
  }

  const matchingChild = tree
    .children(path)
    .find((child) => child.startsWith(`${number}-`));

  if (matchingChild) {
    const fullPath = path + '/' + matchingChild;
    return fullPath;
  }

  for (const child of tree.children(path)) {
    const childPath = path + '/' + child;
    const result = findPreviousChallengeFilePath(tree, childPath, number);
    if (result) {
      return result;
    }
  }
  return null;
}

export async function challengeGenerator(tree: Tree, options: Schema) {
  const { appProjectName, appDirectory } = getProjectDir(
    options.name,
    `apps/${options.category}`,
  );

  const difficulty = options.challengeDifficulty;

  await applicationGenerator(tree, {
    ...options,
    directory: `apps/${options.category}`,
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

  const challengeNumberPath = 'challenge-number.json';
  const challangeNumberJson = JSON.parse(
    tree.read(challengeNumberPath).toString(),
  );
  const challengeNumber = challangeNumberJson.total + 1;
  const order = challangeNumberJson[difficulty] + 1;

  generateFiles(tree, join(__dirname, 'files', 'app'), appDirectory, {
    tmpl: '',
  });
  tree.delete(join(appDirectory, './src/app/nx-welcome.component.ts'));

  generateFiles(tree, join(__dirname, 'files', 'readme'), appDirectory, {
    tmpl: '',
    projectName: names(options.name).name,
    appProjectName,
    title: options.title,
    challengeNumber,
    category: options.category,
  });

  generateFiles(
    tree,
    join(__dirname, 'files', 'docs'),
    `./docs/src/content/docs/challenges/${options.category}`,
    {
      tmpl: '',
      projectName: names(options.name).name,
      appProjectName,
      author: options.author,
      title: options.title,
      challengeNumber,
      difficulty,
      order,
    },
  );

  if (options.addTest) {
    generateFiles(tree, join(__dirname, 'files', 'test'), appDirectory, {
      tmpl: '',
    });
  }

  const readme = tree.read('./README.md').toString();

  const readmeRegex = new RegExp(`all ${challengeNumber - 1} challenges`);
  const readmeReplace = readme.replace(
    readmeRegex,
    `all ${challengeNumber} challenges`,
  );

  tree.write('./README.md', readmeReplace);

  const docs = tree.read('./docs/src/content/docs/index.mdx').toString();

  const regex = new RegExp(`${challengeNumber - 1} Challenges`, 'gi');
  const replaced = docs.replace(regex, `${challengeNumber} Challenges`);

  const linkRegex = new RegExp(`link: \\/challenges\\/(.*?)\n`, 'gi');
  const replacedLink = replaced.replace(
    linkRegex,
    `link: /challenges/${options.category}/${challengeNumber}-${
      names(options.name).name
    }/\n`,
  );

  tree.write('./docs/src/content/docs/index.mdx', replacedLink);

  const previousChallengeFilePath = findPreviousChallengeFilePath(
    tree,
    `./docs/src/content/docs/challenges`,
    String(challengeNumber - 1),
  );

  const previousChallenge = tree.read(previousChallengeFilePath).toString();

  tree.write(
    previousChallengeFilePath,
    previousChallenge.replace(`badge: New`, ``),
  );

  updateJson(tree, challengeNumberPath, (json) => {
    json.total += 1;
    json[difficulty] += 1;
    return json;
  });

  await formatFiles(tree);
}

export default challengeGenerator;
