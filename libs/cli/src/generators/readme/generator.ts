import { Tree, formatFiles } from '@nx/devkit';

const README_FILENAME = 'README.md';
const OMIT = ['memoized', 'projection', 'testing-table', 'testing-forms'];

function findReadMe(tree: Tree, path: string): string[] {
  let result: string[] = [];
  if (!tree.isFile(path)) {
    tree.children(path).forEach((child) => {
      if (!OMIT.includes(child)) {
        if (child === README_FILENAME) {
          result.push(path + '/' + child);
        } else {
          result = result.concat(findReadMe(tree, path + '/' + child));
        }
      }
    });
  }
  return result;
}

function findDocFile(
  tree: Tree,
  path: string,
  number: string,
  result: string[],
) {
  if (!tree.isFile(path)) {
    tree.children(path).forEach((child) => {
      if (child.startsWith(`${number}-`)) {
        result.push(path + '/' + child);
      } else {
        findDocFile(tree, path + '/' + child, number, result);
      }
    });
  }
}

function findHref(href) {
  const regexHref = new RegExp(/href=("|')(.+?)("|')/);
  const matchHref = href.match(regexHref);

  return matchHref[2];
}

async function rewriteFile(tree: Tree, file: string) {
  console.log('Current file', file);
  const buffer = tree.read(file);

  const regex = new RegExp(/Answer:(\d+)/);
  const match = buffer.toString().match(regex);

  if (!match) throw new Error('NO MATCH');

  const number = parseInt(match[1], 10);

  const result = [];
  findDocFile(
    tree,
    './docs/src/content/docs/challenges',
    String(number),
    result,
  );
  const docFile = result[0];

  const pathElts = docFile.split('/');
  const link = `https://angular-challenges.vercel.app/challenges/${pathElts.at(
    -2,
  )}/${pathElts.at(-1)}/`;

  const doc = tree.read(docFile);

  const regexTitle = new RegExp(/title:\s(🟢|🟠|🔴)\s(.+?)\n/);
  const matchTitle = doc.toString().match(regexTitle);
  const title = matchTitle[2];

  const regexCommand = new RegExp(/npx nx serve\s(.+?)`\s/);
  const matchCommand = buffer.toString().match(regexCommand);

  let command = '';
  if (!matchCommand) {
    const regexOldCommand = new RegExp(/nx serve\s(.+?)\*/);
    command = buffer.toString().match(regexOldCommand)[1];
  } else {
    command = matchCommand[1];
  }

  console.log('commande:', command);

  const finalText = `# ${title}

> author: thomas-laforge

### Run Application

\`\`\`bash
npx nx serve ${command}
\`\`\`

### Documentation and Instruction

Challenge documentation is [here](${link}).
`;

  tree.write(file, finalText);

  ///**** */

  const regexHref = new RegExp(/<a href=("|')(.+?)("|')/, 'g');
  const href = buffer.toString().match(regexHref).map(findHref);

  console.log('HREF', href);

  let footerText = `:::note
Start the project by running: \`npx nx serve ${command}\`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:${number}</b>.
:::

<div class="article-footer">
  <a
    href="${href[0]}"
    alt="${title} community solutions">
    ❖ Community Answers
  </a>
  <a
    href='${href[1]}'
    alt="${title} solution author">
    ▶︎ Author Answer
  </a>
  `;

  if (href[2].startsWith('https://medium')) {
    footerText = `${footerText}<a
    href='${href[2]}'
    target="_blank"
    rel="noopener noreferrer"
    alt="${title} blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
    `;
  } else {
    footerText = `${footerText}</div>
`;
  }

  const regexHeader = new RegExp(/([\s\S]*?)\s:::note/);
  const header = doc.toString().match(regexHeader)[1];

  console.log('header', header);

  const regexContent = new RegExp(
    /author: thomas-laforge([\s\S]*?)### Submitting your work/,
  );
  const matchContent = buffer.toString().match(regexContent);

  let content = '';
  if (!matchContent) {
    const regexOldContent = new RegExp(
      /author: thomas-laforge([\s\S]*?)## Submitting your work/,
    );
    content = buffer.toString().match(regexOldContent)[1];
  } else {
    content = matchContent[1];
  }

  const fullDocText = `${header}

:::note
WIP
:::
     
<div class="chip">Challenge #${number}</div>

${content}

---

${footerText}
  `;

  tree.write(docFile, fullDocText);
}

export async function readmeGenerator(tree: Tree) {
  const readmeFiles = findReadMe(tree, './apps');

  for (const f of readmeFiles) {
    // const f = './apps/performance/default-onpush/README.md';
    await rewriteFile(tree, f);
  }

  await formatFiles(tree);
}

export default readmeGenerator;
