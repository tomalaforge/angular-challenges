import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { TodosService } from '../services/todos.service';
import * as todosActions from './todos.actions';

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodosService);

  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(todosActions.fetchTodos),
      exhaustMap(() =>
        this.todoService.getAll().pipe(
          map((todos) => todosActions.fetchTodosSuccess({ todos })),
          catchError(() => of(todosActions.fetchTodosError())),
        ),
      ),
    );
  });

  updateTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(todosActions.updateTodo),
      exhaustMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          map((todo) => todosActions.updateTodoSuccess({ todo })),
          catchError((err) =>
            of(
              todosActions.updateTodoError({
                message: err.message,
                id: todo.id,
              }),
            ),
          ),
        ),
      ),
    );
  });

  deleteTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(todosActions.deleteTodo),
      exhaustMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map(() => todosActions.deleteTodoSuccess({ id })),
          catchError((err) =>
            of(
              todosActions.deleteTodoError({
                message: err.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
