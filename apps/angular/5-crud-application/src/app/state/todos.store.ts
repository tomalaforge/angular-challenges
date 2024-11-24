import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { RestService } from '../rest.service';
import { Todo } from './todo.model';

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
}

export const initialState: TodoState = {
  todos: [],
  isLoading: false,
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos, isLoading }) => ({
    isLoading: computed(() => isLoading()),
    todos: computed(() => todos()),
  })),
  withMethods((store, restService = inject(RestService)) => ({
    fetchData: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return restService.fetchData().pipe(
            tapResponse({
              next: (todos) =>
                patchState(store, () => {
                  return { todos: todos };
                }),
              error: () => console.error('Error fetching data'),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          );
        }),
      ),
    ),
    update: rxMethod<Todo>(
      pipe(
        switchMap((todo) =>
          restService.update(todo).pipe(
            tapResponse({
              next: (updatedTodo) =>
                patchState(store, (state) => {
                  const updatedTodos = state.todos.map((t) =>
                    t.id === updatedTodo.id ? updatedTodo : t,
                  );
                  return { todos: updatedTodos };
                }),
              error: () => console.error('Error updating todo'),
            }),
          ),
        ),
      ),
    ),

    delete(id: number) {
      patchState(store, (state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
      return restService.delete(id).subscribe();
    },
  })),
);
