import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TODO } from './models/todo.model';
import { TodoService } from './services/todo.service';

export type TodosState = {
  todos: TODO[];
  isLoading: boolean;
};

const initialState: TodosState = {
  todos: [],
  isLoading: false,
};

export const todoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state) => {
    const todoService = inject(TodoService);
    return {
      getTodos: function (): void {
        patchState(state, { isLoading: true });
        todoService.getTodos().subscribe({
          next: (todos) => {
            patchState(state, { todos: todos, isLoading: false });
          },
          error: () => {
            patchState(state, { isLoading: false });
          },
        });
      },
      updateTodo: function (todo: TODO): void {
        const todos = state
          .todos()
          .map((td) => (td.id === todo.id ? todo : td));
        patchState(state, { todos: todos, isLoading: false });
      },
      deleteTodo: function (todoId: number): void {
        const todos = state.todos().filter((td) => td.id !== todoId);
        patchState(state, { todos: todos, isLoading: false });
      },
    };
  }),
);
