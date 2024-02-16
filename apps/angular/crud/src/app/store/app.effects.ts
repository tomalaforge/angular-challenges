import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AppService, TODO } from '../app.service';
import {
  addedAllTodosAction,
  deleteTodoAction,
  errorAction,
  getAllTodosAction,
  successUpdateTodoAction,
  successdeleteTodoAction,
  updateTodoAction,
} from './app.actions';

@Injectable()
export class TodosEffects {
  getTodos = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTodosAction),
      switchMap(() =>
        this.appService.getAllTodos().pipe(
          map((todos) => addedAllTodosAction({ todos: todos as TODO[] })),
          catchError(() =>
            of(errorAction({ error: 'Faild to Load All Todos' })),
          ),
        ),
      ),
    ),
  );

  updateTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodoAction),
      switchMap(({ todo }) =>
        this.appService.update(todo).pipe(
          map((todo) =>
            successUpdateTodoAction({ todo: todo, loading: false }),
          ),
          catchError(() =>
            of(errorAction({ error: 'Faild to Udate the Todo' })),
          ),
        ),
      ),
    ),
  );

  deleteTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodoAction),
      switchMap(({ id }) => {
        const did = id;
        return this.appService.delete(did).pipe(
          map(() => successdeleteTodoAction({ id: did, loading: false })),
          catchError(() => of(errorAction({ error: 'Faild to Delete Todo' }))),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private readonly appService: AppService,
  ) {}
}
