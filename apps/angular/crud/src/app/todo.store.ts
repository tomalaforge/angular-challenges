import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import {
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, switchMap, tap } from 'rxjs';
import { TodoService } from './todo.service';
import { Todo } from './types';
import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
} from './util/call-state.feature';

export const TodoStore = signalStore(
  withEntities<Todo>(),
  withCallState(),
  withMethods((state, todoService = inject(TodoService)) => {
    return {
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(state, setLoading())),
          switchMap(() => {
            return todoService.todos.pipe(
              tapResponse({
                next: (todos) => {
                  patchState(state, setAllEntities(todos), setLoaded());
                },
                error: (error) => patchState(state, setError(error)),
              }),
            );
          }),
        ),
      ),
      update: rxMethod<Todo>(
        pipe(
          tap(() => patchState(state, setLoading())),
          concatMap((todo) => {
            return todoService.update(todo).pipe(
              tapResponse({
                next: (todoUpdated) => {
                  patchState(
                    state,
                    updateEntity({
                      id: todoUpdated.id,
                      changes: todoUpdated,
                    }),
                    setLoaded(),
                  );
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
                  patchState(state, removeEntity(todo.id), setLoaded());
                },
                error: (error) => patchState(state, setError(error)),
              }),
            );
          }),
        ),
      ),
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    },
  }),
);
