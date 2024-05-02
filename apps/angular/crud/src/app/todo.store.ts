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
import { concatMap, pipe, switchMap } from 'rxjs';
import { TodoService } from './todo.service';
import { Todo } from './types';

export const TodoStore = signalStore(
  withEntities<Todo>(),
  withMethods((state, todoService = inject(TodoService)) => {
    return {
      load: rxMethod<void>(
        pipe(
          switchMap(() => {
            return todoService.todos.pipe(
              tapResponse({
                next: (todos) => patchState(state, setAllEntities(todos)),
                error: (error) => {
                  console.log({ error });
                },
                finalize: () => {
                  console.log('done loading todos');
                },
              }),
            );
          }),
        ),
      ),
      update: rxMethod<Todo>(
        pipe(
          concatMap((todo) => {
            return todoService.update(todo).pipe(
              tapResponse({
                next: (todoUpdated) =>
                  patchState(
                    state,
                    updateEntity({
                      id: todoUpdated.id,
                      changes: todoUpdated,
                    }),
                  ),
                error: (error) => {
                  console.log({ error });
                },
                finalize: () => {
                  console.log(`done updating ${todo.id}`);
                },
              }),
            );
          }),
        ),
      ),
      delete: rxMethod<Todo>(
        pipe(
          concatMap((todo) => {
            return todoService.delete(todo).pipe(
              tapResponse({
                next: () => patchState(state, removeEntity(todo.id)),
                error: (error) => {
                  console.log({ error });
                },
                finalize: () => {
                  console.log(`done updating ${todo.id}`);
                },
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
