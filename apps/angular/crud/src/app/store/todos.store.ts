import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from '../models';

export type TodosState = {
  todos: Todo[] | undefined;
  isLoading: boolean;
  error: unknown;
};

const initialState: TodosState = {
  todos: undefined,
  isLoading: true,
  error: null,
};

export const TodosStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setTodos(todos: Todo[]): void {
      patchState(store, (_) => ({
        todos,
        isLoading: false,
        error: null,
      }));
    },
    updateTodo(todo: Todo): void {
      patchState(store, (state) => ({
        todos: Todo.updateItemInArray(state.todos, todo),
        isLoading: false,
        error: null,
      }));
    },
    deleteTodo(todo: Todo): void {
      patchState(store, (state) => ({
        todos: Todo.deleteItemFromArray(state.todos, todo),
        isLoading: false,
        error: null,
      }));
    },
    setLoading(isLoading: boolean): void {
      patchState(store, (state) => ({
        ...state,
        isLoading,
      }));
    },
    setError(error: unknown): void {
      patchState(store, (state) => ({
        todos: state.todos,
        isLoading: false,
        error,
      }));
    },
  })),
);
