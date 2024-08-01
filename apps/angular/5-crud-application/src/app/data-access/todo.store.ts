import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { Todo } from '../model/todo.model';
import { TodoService } from './todo.service';

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | undefined;
  proccessedTodoId: number | undefined;
  proccessedTodoError: string | undefined;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: undefined,
  proccessedTodoId: undefined,
  proccessedTodoError: undefined,
};

export const TodoStore = signalStore(
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => todoService.getAll()),
        tapResponse({
          next: (todos: Todo[]) => {
            patchState(store, { todos, loading: false });
          },
          error: () => {
            patchState(store, {
              loading: false,
              error: 'Error encountered loading todos',
            });
          },
        }),
      ),
    ),
    updateOne: rxMethod<Todo>(
      pipe(
        tap((todo: Todo) =>
          patchState(store, {
            proccessedTodoId: todo.id,
            proccessedTodoError: undefined,
          }),
        ),
        switchMap((todo: Todo) => todoService.update(todo)),
        tapResponse({
          next: (todoUpdated: Todo) => {
            const updatedTodos = store
              .todos()
              .map((to) => (to.id === todoUpdated.id ? todoUpdated : to));
            patchState(store, {
              todos: updatedTodos,
              proccessedTodoId: undefined,
              proccessedTodoError: undefined,
            });
          },
          error: (err) => {
            patchState(store, { proccessedTodoError: 'error updating todo' });
            console.error('error updating todo', err);
          },
        }),
      ),
    ),
    deleteOne: rxMethod<number>(
      pipe(
        tap((id: number) =>
          patchState(store, {
            proccessedTodoId: id,
            proccessedTodoError: undefined,
          }),
        ),
        switchMap((id: number) => todoService.delete(id).pipe(map(() => id))),
        tapResponse({
          next: (id: number) => {
            patchState(store, {
              todos: store.todos().filter((to) => to.id !== id),
              proccessedTodoId: undefined,
              proccessedTodoError: undefined,
            });
          },
          error: (err) => {
            patchState(store, { proccessedTodoError: 'error deleting todo' });
            console.error('error deleting todo', err);
          },
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
