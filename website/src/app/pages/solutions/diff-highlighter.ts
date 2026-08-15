import type { HighlighterCore } from 'shiki/core';
import { DiffLine, Hunk } from './diff-parser';

/** Same themes as the build-time markdown highlighting (tools/generate-content.mjs). */
const THEMES = {
  light: 'github-light-default',
  dark: 'github-dark-default',
} as const;

/** Languages a solution diff can realistically contain. */
export type DiffLanguage =
  'angular-ts' | 'angular-html' | 'javascript' | 'css' | 'scss' | 'json' | 'markdown' | 'yaml';

const LANG_BY_EXT: Record<string, DiffLanguage> = {
  ts: 'angular-ts',
  html: 'angular-html',
  js: 'javascript',
  mjs: 'javascript',
  css: 'css',
  scss: 'scss',
  json: 'json',
  md: 'markdown',
  yml: 'yaml',
  yaml: 'yaml',
};

let highlighterPromise: Promise<HighlighterCore> | null = null;

/**
 * Lazily builds a shiki highlighter with only the grammars a diff can need.
 * Everything is dynamically imported so shiki stays out of the initial bundle.
 */
async function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]);
    return createHighlighterCore({
      themes: [
        import('@shikijs/themes/github-light-default'),
        import('@shikijs/themes/github-dark-default'),
      ],
      langs: [
        import('@shikijs/langs/angular-ts'),
        import('@shikijs/langs/angular-html'),
        import('@shikijs/langs/javascript'),
        import('@shikijs/langs/css'),
        import('@shikijs/langs/scss'),
        import('@shikijs/langs/json'),
        import('@shikijs/langs/markdown'),
        import('@shikijs/langs/yaml'),
      ],
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    });
  })();
  return highlighterPromise;
}

export function languageFor(filename: string): DiffLanguage | null {
  const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
  return LANG_BY_EXT[ext] ?? null;
}

/**
 * Attaches syntax-highlighting tokens to every line of the given hunks.
 * Each side of the diff (old = context + deletions, new = context + additions)
 * is highlighted as one block so multi-line constructs keep their context.
 */
export async function highlightHunks(lang: DiffLanguage, hunks: Hunk[]): Promise<void> {
  const highlighter = await getHighlighter();
  for (const hunk of hunks) {
    highlightSide(
      highlighter,
      lang,
      hunk.lines.filter((line) => line.type !== 'add'),
    );
    highlightSide(
      highlighter,
      lang,
      hunk.lines.filter((line) => line.type !== 'del'),
    );
  }
}

function highlightSide(highlighter: HighlighterCore, lang: DiffLanguage, lines: DiffLine[]): void {
  if (!lines.length) {
    return;
  }
  const code = lines.map((line) => line.text).join('\n');
  const tokens = highlighter.codeToTokensWithThemes(code, { lang, themes: THEMES });
  lines.forEach((line, i) => {
    line.tokens = (tokens[i] ?? []).map((token) => ({
      text: token.content,
      light: token.variants['light']?.color,
      dark: token.variants['dark']?.color,
    }));
  });
}
