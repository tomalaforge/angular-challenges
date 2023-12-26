import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntities,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { lastValueFrom, map, pipe, switchMap, tap } from 'rxjs';
import { Todo, TodoState } from './todo.model';
import { TodoService } from './todo.service';

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withEntities<Todo>(),
  withState<{ state: TodoState; disabled: boolean }>({
    state: 'loading',
    disabled: false,
  }),
  withMethods(({ ...store }) => {
    const service = inject(TodoService);
    return {
      async loadAll() {
        patchState(store, { state: 'loading' });
        try {
          const todos = await lastValueFrom(service.getTodos());
          patchState(store, addEntities(todos), { state: 'loaded' });
        } catch (e) {
          patchState(store, { state: 'error' });
        }
      },
      updateItem(todo: Todo) {
        const update = { id: todo.id, changes: { ...todo } };
        patchState(store, updateEntity(update));
      },
      deleteItem(id: number) {
        patchState(store, removeEntity(id));
      },
      resetState() {
        patchState(store, { state: 'loaded' });
      },
      disableButtons() {
        patchState(store, { disabled: true });
      },
      enableButtons() {
        patchState(store, { disabled: false });
      },
    };
  }),
);

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState<{ todo: Todo; state: TodoState }>({
    todo: type<Todo>(),
    state: 'loaded',
  }),
  withMethods(({ ...store }) => {
    const service = inject(TodoService);
    const globalStore = inject(TodosStore);
    return {
      put: rxMethod<Todo>(
        pipe(
          tap(() => {
            globalStore.disableButtons();
            patchState(store, { state: 'loading' });
          }),
          switchMap((todo) => service.putTodo(todo)),
          tap({
            next: (_todo): void => {
              globalStore.updateItem(_todo);
              globalStore.enableButtons();
              patchState(store, { state: 'loaded' });
            },
            error: (): void => {
              patchState(store, { state: 'error' });
              globalStore.enableButtons();
            },
          }),
        ),
      ),
      delete: rxMethod<number>(
        pipe(
          tap(() => {
            globalStore.disableButtons();
            patchState(store, { state: 'loading' });
          }),
          switchMap((id) => service.deleteTodo(id).pipe(map(() => id))),
          tap({
            next: (id): void => {
              globalStore.deleteItem(id);
              globalStore.enableButtons();
              patchState(store, { state: 'loaded' });
            },
            error: (): void => {
              patchState(store, { state: 'error' });
              globalStore.enableButtons();
            },
          }),
        ),
      ),
    };
  }),
);
