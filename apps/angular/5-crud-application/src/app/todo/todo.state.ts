import { todo } from './todo.model';

export interface TodoState {
  todos: todo[];
  isLoading: boolean;
  processingIds: Set<number>;
  errors: Record<number, string | null>;
}
