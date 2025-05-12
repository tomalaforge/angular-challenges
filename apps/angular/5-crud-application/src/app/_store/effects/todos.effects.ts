import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Todo } from '../../_interfaces/todo.interface';
import { TodosService } from '../../_services/todos.service';
import {
  deleteTodoActions,
  loadTodosActions,
  updateTodoActions,
} from '../actions';

export const loadTodosEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    todosService = inject(TodosService),
  ) => {
    return actions$.pipe(
      ofType(loadTodosActions.load),
      switchMap(() =>
        todosService.getTodos().pipe(
          map((todos) => loadTodosActions.success({ todos })),
          catchError((error) => of(loadTodosActions.failure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const updateTodoEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    todosService = inject(TodosService),
  ) => {
    return actions$.pipe(
      ofType(updateTodoActions.update),
      mergeMap(({ update }) =>
        todosService
          .updateTodo(
            typeof update.id === 'string' ? parseInt(update.id, 10) : update.id,
            update.changes,
          )
          .pipe(
            map((updatedTodo: Todo) =>
              updateTodoActions.success({
                update: {
                  id: updatedTodo.id,
                  changes: updatedTodo,
                },
              }),
            ),
            catchError((error) => of(updateTodoActions.failure({ error }))),
          ),
      ),
    );
  },
  { functional: true },
);

export const deleteTodoEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    todosService = inject(TodosService),
  ) => {
    return actions$.pipe(
      ofType(deleteTodoActions.delete),
      mergeMap(({ todo }) =>
        todosService.deleteTodo(todo.id).pipe(
          map((deletedTodo: Todo) =>
            deleteTodoActions.success({ todo: deletedTodo }),
          ),
          catchError((error) => of(updateTodoActions.failure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
