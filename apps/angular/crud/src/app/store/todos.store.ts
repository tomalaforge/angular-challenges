import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from '../models';

export type TodosState = {
  todos: Todo[] | undefined;
  updatingTodoId: number | undefined;
  isLoading: boolean;
  error: unknown;
};

const initialState: TodosState = {
  todos: undefined,
  updatingTodoId: undefined,
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
    updateTodo(todoId: number): void {
      patchState(store, (state) => ({
        ...state,
        updatingTodoId: todoId,
        error: null,
        isLoading: true,
      }));
    },
    changeTodo(todo: Todo): void {
      patchState(store, (state) => ({
        todos: Todo.updateItemInArray(state.todos, todo),
        updatingTodoId: undefined,
        isLoading: false,
        error: null,
      }));
    },
    deleteTodo(todo: Todo): void {
      patchState(store, (state) => ({
        todos: Todo.deleteItemFromArray(state.todos, todo),
        updatingTodoId: undefined,
        isLoading: false,
        error: null,
      }));
    },
    setError(error: unknown): void {
      patchState(store, (state) => ({
        todos: state.todos,
        updatingTodoId: state.updatingTodoId,
        isLoading: false,
        error,
      }));
    },
  })),
);
