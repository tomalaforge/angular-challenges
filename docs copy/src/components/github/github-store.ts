import { derived, writable } from 'svelte/store';

export const token = writable<string | null>(null);
export const isConnected = writable(false);

export const username = writable(null);

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
  const persistedToken = localStorage.getItem(TOKEN_KEY);
  if (persistedToken) {
    token.set(JSON.parse(persistedToken));
    isConnected.set(true);
  } else {
    isConnected.set(false);
  }
}

token.subscribe((value) => {
  if (value) {
    if (value === 'delete') {
      localStorage.removeItem(TOKEN_KEY);
      token.set(null);
      return;
    }
    localStorage.setItem(TOKEN_KEY, JSON.stringify(value));
  }
});
