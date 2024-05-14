import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type CustomError = { error: string };
export type LoadingState = 'init' | 'loading' | 'loaded' | CustomError;

export function withLoadingState() {
  return signalStoreFeature(
    withState<{ loadingState: LoadingState }>({ loadingState: 'init' }),
    withComputed(({ loadingState }) => ({
      loading: computed(() => loadingState() === 'loading'),
      loaded: computed(() => loadingState() === 'loaded'),
    })),
  );
}

export function setLoading(): { loadingState: LoadingState } {
  return { loadingState: 'loading' };
}

export function setLoaded(): {
  loadingState: LoadingState;
} {
  return { loadingState: 'loaded' };
}

export function setError(error: Error): { loadingState: LoadingState } {
  return { loadingState: { error: error.message } };
}

export function isCustomError(
  loadingState: 'init' | 'loading' | 'loaded' | CustomError,
): loadingState is CustomError {
  return (loadingState as CustomError).error !== undefined;
}
