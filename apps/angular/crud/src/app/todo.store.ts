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
import { pipe, switchMap, tap } from 'rxjs';
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
      update(updatedTodo: Todo) {
        patchState(
          state,
          updateEntity({
            id: updatedTodo.id,
            changes: updatedTodo,
          }),
        );
      },
      delete(todo: Todo) {
        patchState(state, removeEntity(todo.id));
      },
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    },
  }),
);
