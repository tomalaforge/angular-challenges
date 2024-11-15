import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from './todo.models';

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const TodoStore = signalStore(
  withState<TodoState>(initialState),
  withMethods((store) => ({
    setTodos(todos: Todo[]): void {
      patchState(store, { todos });
    },

    updateTodo(todo: Todo): void {
      patchState(store, (state) => ({
        todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
      }));
    },

    deleteTodo(id: number): void {
      patchState(store, (state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
    },
  })),
);
