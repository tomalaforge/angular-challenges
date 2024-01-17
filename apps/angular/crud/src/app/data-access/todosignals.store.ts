import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { Todo } from '../model/todo.model';
import { TodoStore } from './todo.store';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
};

const initialState: TodoState = {
  todos: [],
  isLoading: false,
};

export const TodoStore2 = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state, TodoSignalService = inject(TodoStore)) => ({
    loadByQuery: rxMethod<void>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(state, { isLoading: true })),
        switchMap(() => {
          return TodoSignalService.getByQuery().pipe(
            tapResponse({
              next: (todos) => patchState(state, { todos }),
              error: console.error,
              finalize: () => patchState(state, { isLoading: false }),
            }),
          );
        }),
      ),
    ),

    delete: rxMethod<number>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(state, { isLoading: true })),
        switchMap((id) => {
          return TodoSignalService.delete(id).pipe(
            tapResponse({
              next: () =>
                patchState(state, {
                  todos: [...state.todos().filter((t) => t.id != id)],
                }),
              error: console.error,
              finalize: () => patchState(state, { isLoading: false }),
            }),
          );
        }),
      ),
    ),

    update: rxMethod<Todo>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(state, { isLoading: true })),
        switchMap((Todo) => {
          return TodoSignalService.update(Todo).pipe(
            tapResponse({
              next: (result) =>
                patchState(state, {
                  todos: [
                    ...state.todos().filter((t) => t.id < Todo.id),
                    result,
                    ...state.todos().filter((t) => t.id > Todo.id),
                  ],
                }),
              error: console.error,
              finalize: () => patchState(state, { isLoading: false }),
            }),
          );
        }),
      ),
    ),
  })),
);
