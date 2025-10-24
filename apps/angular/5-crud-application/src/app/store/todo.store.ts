import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, Observable, pipe, switchMap, tap } from 'rxjs';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

type TodoState = {
  todos: Array<Todo>;
  processingIds: Array<number>;
};

const initialState: TodoState = {
  todos: [],
  processingIds: [],
};

function addId(arr: number[], id: number) {
  return arr.includes(id) ? arr : [...arr, id];
}

function removeId(arr: number[], id: number) {
  return arr.filter((x) => x !== id);
}

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => {
    const loadTodos = rxMethod<void>(
      pipe(
        switchMap(() => todoService.getTodos()),
        tap((todos) => patchState(store, { todos })),
      ),
    );

    const processTodo = <T>(
      id: number,
      action$: (id: number) => Observable<T>,
      after: (res: T) => void,
    ) => {
      patchState(store, (s) => ({ processingIds: addId(s.processingIds, id) }));

      return action$(id).pipe(
        tap((result) => after(result)),
        finalize(() =>
          patchState(store, (s) => ({
            processingIds: removeId(s.processingIds, id),
          })),
        ),
      );
    };

    const updateTodo = rxMethod<Todo>(
      pipe(
        switchMap((todo) =>
          processTodo(
            todo.id,
            () => todoService.updateTodo(todo),
            (updated) =>
              patchState(store, (s) => ({
                todos: s.todos.map((t) => (t.id === updated.id ? updated : t)),
              })),
          ),
        ),
      ),
    );

    const removeTodo = rxMethod<number>(
      pipe(
        switchMap((id) =>
          processTodo(
            id,
            (id) => todoService.deleteTodo(id),
            () =>
              patchState(store, (s) => ({
                todos: s.todos.filter((t) => t.id !== id),
              })),
          ),
        ),
      ),
    );

    return {
      loadTodos,
      updateTodo,
      removeTodo,
    };
  }),
  withComputed((store) => ({
    isProcessing: () => (id: number) => store.processingIds().includes(id),
  })),
  withHooks({
    onInit(store) {
      store.loadTodos();
    },
  }),
);
