import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
};

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: '',
};

export const TodosStore = signalStore(
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    load: () => {
      patchState(store, () => ({ isLoading: true }));
      todoService.getTodos().subscribe({
        next: (todos) =>
          patchState(store, (state) => ({
            todos,
            isLoading: false,
          })),
        error: (error) =>
          patchState(store, () => ({ isLoading: false, error: error })),
      });
    },
    update: (todo: Todo) => {
      patchState(store, () => ({ isLoading: true }));
      todoService.updateTodo(todo).subscribe({
        next: () =>
          patchState(store, (state) => ({
            todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
            isLoading: false,
          })),
        error: (error) =>
          patchState(store, () => ({ isLoading: false, error: error })),
      });
    },
    delete: (todo: Todo) => {
      patchState(store, () => ({ isLoading: true }));
      todoService.deleteTodo(todo).subscribe({
        next: () =>
          patchState(store, (state) => ({
            todos: state.todos.filter((t) => t.id !== todo.id),
            isLoading: false,
          })),
        error: (error) =>
          patchState(store, () => ({ isLoading: false, error: error })),
      });
    },
  })),
);
