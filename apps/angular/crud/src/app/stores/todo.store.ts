import { signalStore, withState } from '@ngrx/signals';
import { Todo } from '../models/todo.model';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
};

const initialState: TodoState = {
  todos: [],
  isLoading: false,
};

export const TodosStore = signalStore(withState(initialState));
