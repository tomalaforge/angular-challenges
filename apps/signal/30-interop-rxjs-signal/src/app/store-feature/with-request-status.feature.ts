import { signalStoreFeature, withState } from '@ngrx/signals';

export interface RequestStatusState {
  loading: boolean;
  error: unknown;
}

const initialState: RequestStatusState = {
  loading: false,
  error: '',
};

export function withRequestStatus() {
  return signalStoreFeature(withState(initialState));
}

export function setLoading(loading: boolean): RequestStatusState {
  return { loading, error: '' };
}

export function setError(error: unknown): RequestStatusState {
  return { error, loading: false };
}
