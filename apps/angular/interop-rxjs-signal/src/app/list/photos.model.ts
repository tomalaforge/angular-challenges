import { Photo } from '../photo.model';

export const STATE_KEYS = ['photos', 'total', 'page', 'term'] as const;
export type StateKey = (typeof STATE_KEYS)[number];

export type State = {
  photos: Photo[];
  total: number;
  page: number;
  term: string;
};

export type APIState = 'init' | 'loading' | 'loaded' | { error: string };

export interface APIResponse {
  state: APIState;
}
