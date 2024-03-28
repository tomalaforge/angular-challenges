import { derived, writable } from 'svelte/store';

export const token = writable<string | null>(null);

export const isLoading = writable(true);
export const error = writable(false);
export const data = writable<any[]>([]);
export const totalCount = writable(0);

export const isLoaded = derived(
  [isLoading, error],
  ([$isLoading, $error]) => !$isLoading && !$error,
);

const TOKEN_KEY = 'TOKEN';

export function loadToken() {
  // Get the current value from localStorage if it exists, otherwise use the startValue
  const persistedValue = localStorage.getItem(TOKEN_KEY);
  if (persistedValue) {
    token.set(JSON.parse(persistedValue));
    return;
  }

  token.set('API call');
}

token.subscribe((value) => {
  if (value) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(value));
  }
});

export const test = writable('test');
