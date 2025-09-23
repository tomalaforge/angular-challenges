import {
  applicationGenerator,
  E2eTestRunner,
  UnitTestRunner,
} from '@nx/angular/generators';
import { formatFiles, generateFiles, Tree, updateJson } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { join } from 'path';
import { langMapper } from './files/lang-mapper';
import { Schema } from './schema';

function findPreviousChallengeFilePath(tree, path, number) {
  if (tree.isFile(path) && path.startsWith(`${number}-`)) {
    return path;
  }

  const matchingChild = tree
    .children(path)
    .find((child) => child.startsWith(`${number}-`));

  if (matchingChild) {
    return path + '/' + matchingChild;
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
  const challengeNumberPath = 'challenge-number.json';
  const challengeNumberJson = JSON.parse(
    tree.read(challengeNumberPath).toString(),
  );
  const challengeNumber =
    options.challengeNumber ?? challengeNumberJson.total + 1;

  const difficulty = options.challengeDifficulty;

  const name = options.title.toLowerCase().split(' ').join('-');

  const order = challengeNumberJson[difficulty] + 1;

  const appProjectName = `${options.category}-${name}`;
  const appDirectory = `apps/${options.category}/${challengeNumber}-${name}`;

  await applicationGenerator(tree, {
    ...options,
    name: `${options.category}-${name}`,
    directory: appDirectory,
    style: 'scss',
    routing: false,
    inlineStyle: true,
    inlineTemplate: true,
    prefix: 'app',
    unitTestRunner: options.addTest ? UnitTestRunner.Jest : UnitTestRunner.None,
    e2eTestRunner: E2eTestRunner.None,
    linter: Linter.EsLint,
    addTailwind: true,
    skipTests: true,
  });

  generateFiles(tree, join(__dirname, 'files', 'app'), appDirectory, {
    tmpl: '',
  });
  tree.delete(join(appDirectory, './src/app/nx-welcome.component.ts'));

  generateFiles(tree, join(__dirname, 'files', 'readme'), appDirectory, {
    tmpl: '',
    projectName: name,
    appProjectName,
    title: options.title,
    challengeNumber,
    category: options.category,
  });

  const authorFile = tree.read(
    `./docs/src/content/authors/${options.author}.json`,
  );
  if (!authorFile) {
    generateFiles(
      tree,
      join(__dirname, 'files', 'author'),
      `./docs/src/content/authors/`,
      {
        tmpl: '',
        authorName: options.author,
      },
    );
  }

  generateFiles(
    tree,
    join(__dirname, 'files', 'docs'),
    `./docs/src/content/docs/challenges/${options.category}`,
    {
      tmpl: '',
      projectName: name,
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

  for (const lang of ['en', 'es', 'fr', 'pt', 'ru']) {
    const docs = tree
      .read(
        `./docs/src/content/docs/${lang === 'en' ? '' : `${lang}/`}index.mdx`,
      )
      .toString();

    const regex = new RegExp(
      `${challengeNumber - 1} ${langMapper[lang]}`,
      'gi',
    );
    const replaced = docs.replace(
      regex,
      `${challengeNumber} ${langMapper[lang]}`,
    );

    const linkRegex = new RegExp(
      `link: \\/${lang}\\/challenges\\/(.*?)\n`,
      'gi',
    );
    const replacedLink = replaced.replace(
      linkRegex,
      `link: /${lang}/challenges/${options.category}/${challengeNumber}-${name}/\n`,
    );

    tree.write(
      `./docs/src/content/docs/${lang === 'en' ? '' : lang}/index.mdx`,
      replacedLink,
    );
  }

  if (!options.challengeNumber) {
    const previousChallengeFilePath = findPreviousChallengeFilePath(
      tree,
      `./docs/src/content/docs/challenges`,
      String(Number(challengeNumber) - 1),
    );

    const previousChallenge = tree.read(previousChallengeFilePath).toString();

    tree.write(
      previousChallengeFilePath,
      previousChallenge.replace(`badge: New`, ``),
    );
  }

  updateJson(tree, challengeNumberPath, (json) => {
    json.total += 1;
    json[difficulty] += 1;
    return json;
  });

  await formatFiles(tree);
}

export default challengeGenerator;
