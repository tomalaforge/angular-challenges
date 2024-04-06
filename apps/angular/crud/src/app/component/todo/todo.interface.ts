import { LoadingState } from '../../shared/state/loading.feature';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  loadingState: LoadingState;
  body?: string;
}
