export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

export interface VideoLink {
  link: string;
  alt?: string;
  flag?: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DocAuthor {
  name: string;
  githubLogin?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface Doc {
  collection: 'guides' | 'challenges';
  category?: string;
  categoryLabel?: string;
  slug: string;
  url: string;
  title: string;
  difficulty?: Difficulty;
  description: string;
  author?: DocAuthor;
  contributors: string[];
  challengeNumber?: number;
  command?: string;
  blogLink?: string;
  videoLinks?: VideoLink[];
  noComments?: boolean;
  hasStarter?: boolean;
  html: string;
  toc: TocEntry[];
}

/** One source file of a challenge's starter app, shown in the in-browser editor. */
export interface StarterFile {
  path: string;
  content: string;
  /** Binary asset (base64-encoded): mounted for the preview, hidden from the editor. */
  base64?: boolean;
}

/**
 * A challenge's starter app bundled for the in-browser editor, with the
 * metadata needed to synthesize a standalone runnable project (WebContainer)
 * and to submit edits back as a pull request.
 */
export interface ChallengeStarter {
  /** Repo-relative app directory, e.g. `apps/angular/1-projection`. */
  appPath: string;
  /** Whether the app can be served standalone (all imports resolvable + has main.ts). */
  runnable: boolean;
  hasTests: boolean;
  runner: 'jest' | 'vitest' | null;
  /** Exact versions from the workspace root package.json. */
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  files: StarterFile[];
}

export interface NavItem {
  title: string;
  difficulty?: Difficulty;
  url: string;
  order: number;
  description: string;
  challengeNumber?: number;
}

export interface NavGroup {
  label: string;
  category: string;
  items: NavItem[];
}

export interface DocsManifest {
  guides: NavItem[];
  challenges: NavGroup[];
}
