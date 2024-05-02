import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, tap } from 'rxjs';
import { TodoService } from './todo.service';
import { TodoStore } from './todo.store';
import { Todo } from './types';
import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
} from './util/call-state.feature';

export const TodoItemStore = signalStore(
  withCallState(),
  withComputed(({ error, loading }) => ({
    onHold: computed(() => loading() || error()),
  })),
  withMethods(
    (
      state,
      todoService = inject(TodoService),
      todoStore = inject(TodoStore),
    ) => {
      return {
        update: rxMethod<Todo>(
          pipe(
            tap(() => patchState(state, setLoading())),
            concatMap((todo) => {
              return todoService.update(todo).pipe(
                tapResponse({
                  next: (updatedTodo) => {
                    patchState(state, setLoaded());
                    todoStore.update(updatedTodo);
                  },
                  error: (error) => patchState(state, setError(error)),
                }),
              );
            }),
          ),
        ),
        delete: rxMethod<Todo>(
          pipe(
            tap(() => patchState(state, setLoading())),
            concatMap((todo) => {
              return todoService.delete(todo).pipe(
                tapResponse({
                  next: () => {
                    patchState(state, setLoaded());
                    todoStore.delete(todo);
                  },
                  error: (error) => patchState(state, setError(error)),
                }),
              );
            }),
          ),
        ),
      };
    },
  ),
);
