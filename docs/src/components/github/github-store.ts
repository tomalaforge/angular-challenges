import { derived, writable } from 'svelte/store';

export const count = writable(0);

export const isLoading = writable(true);
export const error = writable(false);
export const data = writable<any[]>([]);
export const totalCount = writable(0);

export const isLoaded = derived(
  [isLoading, error],
  ([$isLoading, $error]) => !$isLoading && !$error,
);
