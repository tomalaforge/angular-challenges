import { todo } from './todo.model';

export interface TodoState {
  todos: todo[];
  isLoading: boolean;
}
