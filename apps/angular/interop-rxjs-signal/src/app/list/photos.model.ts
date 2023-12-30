import { Photo } from '../photo.model';

export const STATE_KEYS = ['photos', 'total', 'page', 'term'] as const;
export type StateKey = (typeof STATE_KEYS)[number];

export type State = {
  [key in StateKey]: key extends 'photos'
    ? Photo[]
    : key extends 'total'
      ? number
      : key extends 'page'
        ? number
        : key extends 'term'
          ? string
          : never;
};

export type APIState = 'init' | 'loading' | 'loaded' | { error: string };

export interface APIResponse {
  state: APIState;
}
