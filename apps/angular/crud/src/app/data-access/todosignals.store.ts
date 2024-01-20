import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { ResponseError, Todo } from '../model/todo.model';
import { LoaderService } from './loader.service';
import { TodoStore } from './todo.store';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
};

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  isDeleting: false,
  isUpdating: false,
};

export const TodoStore2 = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      state,
      loaderService = inject(LoaderService),
      TodoSignalService = inject(TodoStore),
    ) => ({
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

      delete: rxMethod<Todo>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap((todo) =>
            patchState(state, {
              todos: [
                ...state.todos().filter((t) => t.id < todo.id),
                { ...todo, status: 'Deleting...' },
                ...state.todos().filter((t) => t.id > todo.id),
              ],
              isDeleting: true,
              isLoading: false,
            }),
          ),
          switchMap((todo) => {
            return TodoSignalService.delete(todo.id).pipe(
              tapResponse({
                next: () =>
                  patchState(state, {
                    todos: [...state.todos().filter((t) => t.id != todo.id)],
                  }),
                error: (err: ResponseError) => {
                  patchState(state, {
                    todos: [
                      ...state.todos().filter((t) => t.id < todo.id),
                      { ...todo, status: err.message },
                      ...state.todos().filter((t) => t.id > todo.id),
                    ],
                  });
                },
                finalize: () => patchState(state, { isDeleting: false }),
              }),
            );
          }),
        ),
      ),

      update: rxMethod<Todo>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap((todo) =>
            patchState(state, {
              todos: [
                ...state.todos().filter((t) => t.id < todo.id),
                { ...todo, status: 'Updating...' },
                ...state.todos().filter((t) => t.id > todo.id),
              ],
              isUpdating: true,
              isLoading: false,
            }),
          ),
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
                error: (err: ResponseError) => {
                  patchState(state, {
                    todos: [
                      ...state.todos().filter((t) => t.id < Todo.id),
                      { ...Todo, status: err.message },
                      ...state.todos().filter((t) => t.id > Todo.id),
                    ],
                  });
                },
                finalize: () =>
                  patchState(state, { isUpdating: false, isLoading: false }),
              }),
            );
          }),
        ),
      ),

      // setStatus(id:number){

      // }
    }),
  ),
);
