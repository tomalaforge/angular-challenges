export interface ViewModel<T> {
  data: Partial<T>;
  status?: 'idle' | 'success' | 'error' | 'loading';
  error?: string;
}
