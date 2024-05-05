import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from './app.component';
import { TodosService } from './app.service';

type TodosState = {
  todos: Todo[];
  isLoading: boolean;
};

const initialState: TodosState = {
  todos: [],
  isLoading: false,
};

export const TodosStore = signalStore(
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });
      todosService.getTodos().subscribe((todos) => {
        patchState(store, { todos, isLoading: false });
      });
    },
  })),
);
