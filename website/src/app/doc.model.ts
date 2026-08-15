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
  html: string;
  toc: TocEntry[];
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
