/**
 * Compiles the markdown content in src/content into TypeScript modules under
 * src/app/generated: one lazy-loadable module per document, a sidebar manifest
 * and a url -> lazy import map. Runs before every build (see "prebuild").
 */
import { readdirSync, readFileSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { createHighlighter } from 'shiki';
import GithubSlugger from 'github-slugger';

const CONTENT_DIR = new URL('../src/content', import.meta.url).pathname;
const OUT_DIR = new URL('../src/app/generated', import.meta.url).pathname;
const APPS_DIR = new URL('../../apps', import.meta.url).pathname;

const CATEGORY_LABELS = {
  angular: 'Angular',
  forms: 'Forms',
  nx: 'Nx',
  performance: 'Performance',
  rxjs: 'RxJS',
  signal: 'Signal',
  testing: 'Testing',
  typescript: 'TypeScript',
};

const DIFFICULTIES = [
  ['🟢', 'easy'],
  ['🟠', 'medium'],
  ['🔴', 'hard'],
];

/** `🟢 Projection` -> { title: 'Projection', difficulty: 'easy' } */
function parseTitle(rawTitle = '') {
  for (const [emoji, difficulty] of DIFFICULTIES) {
    if (rawTitle.startsWith(emoji)) {
      return { title: rawTitle.slice(emoji.length).trim(), difficulty };
    }
  }
  return { title: rawTitle, difficulty: undefined };
}

/**
 * Author profiles keyed by lowercase file slug: the `author` frontmatter
 * references a JSON file in src/content/authors (e.g. thomas-laforge.json,
 * which maps to the GitHub handle tomalaforge).
 */
const AUTHORS = new Map(
  readdirSync(join(CONTENT_DIR, 'authors'))
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const data = JSON.parse(readFileSync(join(CONTENT_DIR, 'authors', file), 'utf8'));
      const githubLogin = data.github?.match(/github\.com\/([^/]+)/)?.[1];
      return [basename(file, '.json').toLowerCase(), { ...data, githubLogin }];
    }),
);

function resolveAuthor(slug) {
  if (!slug) {
    return undefined;
  }
  const author = AUTHORS.get(slug.toLowerCase());
  if (!author) {
    console.warn(`Unknown author "${slug}" — no matching file in src/content/authors.`);
    return { name: slug };
  }
  return {
    name: author.name,
    githubLogin: author.githubLogin,
    twitter: author.twitter,
    linkedin: author.linkedin,
    youtube: author.youtube,
  };
}

const SHIKI_LANGS = [
  'typescript',
  'javascript',
  'html',
  'css',
  'json',
  'bash',
  'shell',
  'yaml',
  'diff',
  'angular-html',
  'angular-ts',
  'jsx',
  'tsx',
];

/** Light colors inline, dark colors in `--shiki-dark*` vars (see styles.css). */
const SHIKI_THEMES = {
  light: 'github-light-default',
  dark: 'github-dark-default',
};

const highlighter = await createHighlighter({
  themes: Object.values(SHIKI_THEMES),
  langs: SHIKI_LANGS,
});

/** Per-document state collected by the renderer. */
let toc = [];
let slugger = new GithubSlugger();

const marked = new Marked({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const plain = text.replace(/<[^>]+>/g, '');
      const id = slugger.slug(plain);
      if (depth === 2 || depth === 3) {
        toc.push({ id, text: plain, depth });
      }
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
    code({ text, lang }) {
      const language = SHIKI_LANGS.includes(lang)
        ? lang
        : lang === 'ts'
          ? 'typescript'
          : lang === 'js'
            ? 'javascript'
            : lang === 'sh'
              ? 'shell'
              : 'text';
      return highlighter.codeToHtml(text, {
        lang: language === 'text' ? 'text' : language,
        themes: SHIKI_THEMES,
      });
    },
  },
});

function rewriteAssetPaths(markdown) {
  return markdown.replace(/(\.\.\/)+assets\//g, '/docs-assets/');
}

/** `import ... from '...';` lines at the top of .mdx files. */
function stripMdxImports(markdown) {
  return markdown.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
}

/** `<LinkCard title description href />` -> plain HTML card. */
function replaceLinkCards(markdown) {
  return markdown.replace(/<LinkCard\s+([\s\S]*?)\/>/g, (_, attrs) => {
    const attr = (name) => {
      const m = attrs.match(new RegExp(`${name}="([^"]*)"`));
      return m ? m[1] : '';
    };
    const title = attr('title');
    const description = marked.parseInline(attr('description'));
    const href = attr('href');
    return `<a class="doc-linkcard" href="${href}"><strong>${title}</strong><span>${description}</span></a>`;
  });
}

/** Starlight `:::note[Title] ... :::` asides -> HTML, content markdown-rendered. */
function extractAsides(markdown) {
  const asides = [];
  const replaced = markdown.replace(
    /^:::(note|tip|caution|danger)(?:\[([^\]]*)\])?\s*\n([\s\S]*?)\n:::\s*$/gm,
    (_, kind, title, content) => {
      asides.push({ kind, title, content });
      return `%%ASIDE_${asides.length - 1}%%`;
    },
  );
  return { replaced, asides };
}

function renderAside({ kind, title, content }) {
  const label = title || { note: 'Note', tip: 'Tip', caution: 'Caution', danger: 'Danger' }[kind];
  const body = marked.parse(content);
  return `<aside class="doc-aside doc-aside--${kind}"><p class="doc-aside__title">${label}</p><div class="doc-aside__content">${body}</div></aside>`;
}

function renderDocument(raw) {
  const { data, content } = matter(raw);
  let md = rewriteAssetPaths(stripMdxImports(content));
  const { replaced, asides } = extractAsides(md);
  md = replaceLinkCards(replaced);

  toc = [];
  slugger = new GithubSlugger();
  let html = marked.parse(md);
  html = html.replace(/(?:<p>)?%%ASIDE_(\d+)%%(?:<\/p>)?/g, (_, i) =>
    renderAside(asides[Number(i)]),
  );
  return { data, html, toc };
}

// --- Starter code -----------------------------------------------------------
// Each challenge app lives in apps/<category>/<number>-<name>. The editor page
// (challenges/:category/:slug/editor) loads its source files as a lazy module.

const STARTER_EXTENSIONS = new Set(['.ts', '.html', '.css', '.scss', '.json', '.md', '.svg']);
const STARTER_EXCLUDED = new Set(['polyfills.ts', 'favicon.ico', '.gitkeep']);
const ASSET_EXTENSIONS = new Set(['.png', '.webp', '.jpg', '.jpeg', '.gif', '.ico', '.svg']);
const ASSET_MAX_BYTES = 300_000;

/** Dependency versions of the challenge workspace, for the synthesized project. */
const ROOT_PACKAGE = JSON.parse(readFileSync(join(APPS_DIR, '..', 'package.json'), 'utf8'));
const ROOT_VERSIONS = { ...ROOT_PACKAGE.devDependencies, ...ROOT_PACKAGE.dependencies };

/** Packages every synthesized project gets, regardless of what the code imports. */
const BASE_DEPENDENCIES = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/router',
  'rxjs',
  'tslib',
  'zone.js',
];
const BASE_DEV_DEPENDENCIES = [
  '@angular/build',
  '@angular/cli',
  '@angular/compiler-cli',
  'typescript',
];
const JEST_DEV_DEPENDENCIES = [
  'jest',
  'jest-environment-jsdom',
  'jest-preset-angular',
  '@types/jest',
];
const VITEST_DEV_DEPENDENCIES = [
  'vitest',
  'vite',
  'jsdom',
  '@analogjs/vite-plugin-angular',
  '@analogjs/vitest-angular',
];

/** `@scope/pkg/deep` -> `@scope/pkg`, `rxjs/operators` -> `rxjs`. */
function packageName(specifier) {
  const segments = specifier.split('/');
  return specifier.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0];
}

/** Bare import specifiers found in the given source files. */
function detectImports(files) {
  const packages = new Set();
  const importRe = /(?:from\s+|import\s*\(\s*|^\s*import\s+)['"]([^'".][^'"]*)['"]/gm;
  for (const file of files) {
    if (!/\.(ts|mjs|js)$/.test(file.path)) {
      continue;
    }
    for (const match of file.content.matchAll(importRe)) {
      packages.add(packageName(match[1]));
    }
  }
  return packages;
}

function resolveVersions(names) {
  const versions = {};
  const missing = [];
  for (const name of names) {
    const version = ROOT_VERSIONS[name];
    if (version) {
      versions[name] = version;
    } else {
      missing.push(name);
    }
  }
  return { versions, missing };
}

function collectStarter(category, challengeNumber) {
  let appDir;
  try {
    appDir = readdirSync(join(APPS_DIR, category)).find((dir) =>
      dir.startsWith(`${challengeNumber}-`),
    );
  } catch {
    return undefined;
  }
  if (!appDir) {
    return undefined;
  }

  const files = [];
  const walk = (relative, inAssets) => {
    for (const entry of readdirSync(join(APPS_DIR, category, appDir, relative), {
      withFileTypes: true,
    })) {
      const path = `${relative}/${entry.name}`;
      const extension = entry.name.slice(entry.name.lastIndexOf('.'));
      if (entry.isDirectory()) {
        walk(path, inAssets || entry.name === 'assets' || entry.name === 'public');
      } else if (STARTER_EXCLUDED.has(entry.name)) {
        continue;
      } else if (inAssets && ASSET_EXTENSIONS.has(extension)) {
        // Images etc. ship base64-encoded so the preview renders faithfully;
        // they are hidden from the editor and never part of a submission.
        const buffer = readFileSync(join(APPS_DIR, category, appDir, path));
        if (buffer.length <= ASSET_MAX_BYTES) {
          files.push({ path, content: buffer.toString('base64'), base64: true });
        }
      } else if (!inAssets && STARTER_EXTENSIONS.has(extension)) {
        files.push({
          path,
          content: readFileSync(join(APPS_DIR, category, appDir, path), 'utf8'),
        });
      }
    }
  };
  walk('src', false);
  if (files.length === 0) {
    return undefined;
  }

  // App code first, then root files (main.ts, index.html, …), each group alphabetical.
  files.sort((a, b) => {
    const aInApp = a.path.startsWith('src/app/');
    const bInApp = b.path.startsWith('src/app/');
    return aInApp === bInApp ? a.path.localeCompare(b.path) : aInApp ? -1 : 1;
  });

  const appFiles = readdirSync(join(APPS_DIR, category, appDir));
  const runner = appFiles.some((f) => f.startsWith('vitest.config.'))
    ? 'vitest'
    : appFiles.some((f) => f.startsWith('jest.config.'))
      ? 'jest'
      : null;
  const hasTests = runner !== null && files.some((f) => /\.spec\.ts$/.test(f.path));

  const imported = detectImports(files);
  const runnerPackages =
    runner === 'jest' && hasTests
      ? JEST_DEV_DEPENDENCIES
      : runner === 'vitest' && hasTests
        ? VITEST_DEV_DEPENDENCIES
        : [];
  const dependencies = resolveVersions(
    new Set([...BASE_DEPENDENCIES, ...[...imported].filter((p) => !p.startsWith('@types/'))]),
  );
  const devDependencies = resolveVersions(new Set([...BASE_DEV_DEPENDENCIES, ...runnerPackages]));

  // Imports that don't map to a workspace dependency (e.g. monorepo libs)
  // can't be installed standalone: the editor still works, running doesn't.
  const canInstall = dependencies.missing.length === 0;
  if (!canInstall) {
    console.warn(
      `Starter ${category}/${appDir} is not runnable — unresolved imports: ${dependencies.missing.join(', ')}`,
    );
  }

  return {
    appPath: `apps/${category}/${appDir}`,
    runnable: canInstall && files.some((f) => f.path === 'src/main.ts'),
    hasTests: hasTests && canInstall,
    runner: hasTests && canInstall ? runner : null,
    dependencies: dependencies.versions,
    devDependencies: devDependencies.versions,
    files,
  };
}

function tsModule(doc, outFile) {
  const depth = outFile.split('/').length;
  const modelPath = '../'.repeat(depth) + 'doc.model';
  return `// Generated by tools/generate-content.mjs — do not edit.
import { Doc } from '${modelPath}';

export const doc: Doc = ${JSON.stringify(doc, null, 2)};
`;
}

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(join(OUT_DIR, 'content', 'guides'), { recursive: true });

const mapEntries = [];
const starterMapEntries = [];
const manifest = { guides: [], challenges: [] };

function emit(doc, outFile) {
  writeFileSync(join(OUT_DIR, outFile), tsModule(doc, outFile));
  const importPath = './' + outFile.replace(/\.ts$/, '');
  mapEntries.push(`  '${doc.url}': () => import('${importPath}').then((m) => m.doc),`);
}

// --- Guides ---------------------------------------------------------------
for (const file of readdirSync(join(CONTENT_DIR, 'guides')).sort()) {
  const raw = readFileSync(join(CONTENT_DIR, 'guides', file), 'utf8');
  const { data, html, toc } = renderDocument(raw);
  const slug = basename(file).replace(/\.mdx?$/, '');
  const url = `/guides/${slug}`;
  const doc = {
    collection: 'guides',
    slug,
    url,
    title: data.title,
    description: data.description ?? '',
    contributors: data.contributors ?? [],
    noComments: data.noCommentSection === true,
    html,
    toc,
  };
  emit(doc, `content/guides/${slug}.ts`);
  manifest.guides.push({
    title: data.title,
    url,
    order: data.sidebar?.order ?? 999,
    description: data.description ?? '',
  });
}
manifest.guides.sort((a, b) => a.order - b.order);

// --- Challenges -----------------------------------------------------------
const categories = readdirSync(join(CONTENT_DIR, 'challenges')).sort();
for (const category of categories) {
  mkdirSync(join(OUT_DIR, 'content', 'challenges', category), { recursive: true });
  const group = {
    label: CATEGORY_LABELS[category] ?? category,
    category,
    items: [],
  };
  for (const file of readdirSync(join(CONTENT_DIR, 'challenges', category)).sort()) {
    const raw = readFileSync(join(CONTENT_DIR, 'challenges', category, file), 'utf8');
    const { data, html, toc } = renderDocument(raw);
    const isIndex = /^index\.mdx?$/.test(file);
    const slug = isIndex ? '' : basename(file).replace(/\.mdx?$/, '');
    const url = isIndex ? `/challenges/${category}` : `/challenges/${category}/${slug}`;
    const { title, difficulty } = parseTitle(data.title);

    const starter =
      !isIndex && data.challengeNumber ? collectStarter(category, data.challengeNumber) : undefined;
    if (starter) {
      mkdirSync(join(OUT_DIR, 'starter', category), { recursive: true });
      writeFileSync(
        join(OUT_DIR, 'starter', category, `${slug}.ts`),
        `// Generated by tools/generate-content.mjs — do not edit.
import { ChallengeStarter } from '../../../doc.model';

export const starter: ChallengeStarter = ${JSON.stringify(starter, null, 2)};
`,
      );
      starterMapEntries.push(
        `  '${url}': () => import('./starter/${category}/${slug}').then((m) => m.starter),`,
      );
    }

    const doc = {
      collection: 'challenges',
      category,
      categoryLabel: CATEGORY_LABELS[category] ?? category,
      slug,
      url,
      title,
      difficulty,
      description: data.description ?? '',
      author: resolveAuthor(data.author),
      contributors: data.contributors ?? [],
      challengeNumber: data.challengeNumber,
      command: data.command,
      blogLink: data.blogLink,
      videoLinks: data.videoLinks ?? [],
      noComments: data.noCommentSection === true,
      hasStarter: Boolean(starter),
      html,
      toc,
    };
    emit(doc, `content/challenges/${category}/${slug || 'index'}.ts`);
    group.items.push({
      title,
      difficulty,
      url,
      order: isIndex ? -1 : (data.sidebar?.order ?? 999),
      description: data.description ?? '',
      challengeNumber: data.challengeNumber,
    });
  }
  group.items.sort((a, b) => a.order - b.order);
  manifest.challenges.push(group);
}

// --- Manifest + import map --------------------------------------------------
writeFileSync(
  join(OUT_DIR, 'manifest.ts'),
  `// Generated by tools/generate-content.mjs — do not edit.
import { DocsManifest } from '../doc.model';

export const MANIFEST: DocsManifest = ${JSON.stringify(manifest, null, 2)};
`,
);

writeFileSync(
  join(OUT_DIR, 'content-map.ts'),
  `// Generated by tools/generate-content.mjs — do not edit.
import { Doc } from '../doc.model';

export const CONTENT_MAP: Record<string, () => Promise<Doc>> = {
${mapEntries.join('\n')}
};
`,
);

writeFileSync(
  join(OUT_DIR, 'starter-map.ts'),
  `// Generated by tools/generate-content.mjs — do not edit.
import { ChallengeStarter } from '../doc.model';

export const STARTER_MAP: Record<string, () => Promise<ChallengeStarter>> = {
${starterMapEntries.join('\n')}
};
`,
);

console.log(
  `Generated ${mapEntries.length} documents, ` +
    `${manifest.guides.length} guides, ${manifest.challenges.length} challenge categories, ` +
    `${starterMapEntries.length} starter code bundles.`,
);
