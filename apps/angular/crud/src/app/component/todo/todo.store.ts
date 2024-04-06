import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  LoadingState,
  setLoaded,
  setLoading,
  withLoadingState,
} from '../../shared/state/loading.feature';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

function setTodoLoadingState(todo: Todo, loadingState: LoadingState) {
  const changes = () => ({ loadingState });

  return updateEntity({ id: todo.id, changes }, { collection: 'todo' });
}

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withLoadingState(),
  withEntities({ entity: type<Todo>(), collection: 'todo' }),
  withComputed(({ todoEntities }) => ({
    loadingEntity: computed(() =>
      todoEntities().find((e) => e.loadingState === 'loading'),
    ),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading())),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => {
          return todoService.getAll().pipe(
            tapResponse({
              next: (todos) =>
                patchState(
                  store,
                  setAllEntities(todos, { collection: 'todo' }),
                ),
              error: console.error,
              finalize: () => patchState(store, setLoaded()),
            }),
          );
        }),
      ),
    ),
    update: rxMethod<Todo>(
      pipe(
        filter(() => !store.loadingEntity()), //do not trigger loading if any todo is currenly processing
        tap((todo) => patchState(store, setTodoLoadingState(todo, 'loading'))),
        debounceTime(500),
        switchMap((todo) => {
          return todoService.update(todo).pipe(
            tapResponse({
              next: (todo) => {
                const changes = () => ({ ...todo });
                patchState(
                  store,
                  updateEntity(
                    { id: todo.id, changes },
                    { collection: 'todo' },
                  ),
                );
              },
              error: (error: Error) => {
                patchState(
                  store,
                  setTodoLoadingState(todo, { error: error.message }),
                );
              },
              finalize: () =>
                patchState(store, setTodoLoadingState(todo, 'loaded')),
            }),
          );
        }),
      ),
    ),
    delete: rxMethod<Todo>(
      pipe(
        filter(() => !store.loadingEntity()), //do not trigger loading if any todo is currenly processing
        tap((todo) => patchState(store, setTodoLoadingState(todo, 'loading'))),
        debounceTime(500),
        switchMap((todo) => {
          return todoService.delete(todo).pipe(
            tapResponse({
              next: () =>
                patchState(
                  store,
                  removeEntity(todo.id, { collection: 'todo' }),
                  setTodoLoadingState(todo, 'loaded'),
                ),
              error: (error: Error) => {
                patchState(
                  store,
                  setTodoLoadingState(todo, { error: error.message }),
                );
              },
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
);
