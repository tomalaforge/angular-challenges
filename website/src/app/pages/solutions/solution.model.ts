export interface Solution {
  number: number;
  title: string;
  login: string;
  avatar: string;
  isAuthor: boolean;
  state: 'open' | 'closed';
  merged: boolean;
  thumbsUp: number;
  comments: number;
  createdAt: string;
  htmlUrl: string;
}

export interface PullMeta {
  number: number;
  title: string;
  login: string;
  avatar: string;
  state: 'open' | 'closed';
  merged: boolean;
  createdAt: string;
  htmlUrl: string;
  additions: number;
  deletions: number;
  changedFiles: number;
}

export interface PullFile {
  filename: string;
  previousFilename?: string;
  status: 'added' | 'removed' | 'modified' | 'renamed' | string;
  additions: number;
  deletions: number;
  patch: string | null;
  blobUrl: string;
}
