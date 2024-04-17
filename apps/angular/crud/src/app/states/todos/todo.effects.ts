import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

import { TodoService } from '../../services/todo.service';
import { appActions } from '../commons/app.actions';
import { todoActions } from './todo.actions';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);

  loadTodosEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadTodosAction),
      exhaustMap((action) => {
        return this.todoService.getTodos().pipe(
          map((data) => {
            return todoActions.loadTodosSuccessAction({ list: data });
          }),
          catchError((error) =>
            of(
              appActions.showAlert({
                message: 'Fail fetching data: ' + error.message,
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    ),
  );

  updateTodoEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.updateTodoAction),
      exhaustMap((action) => {
        return this.todoService.updateTodo(action.task).pipe(
          mergeMap((data) => {
            return of(
              todoActions.updateTodoSuccessAction({ task: data }),
              appActions.showAlert({
                message: 'Task Updated',
                resultType: 'pass',
              }),
            );
          }),
          catchError((error) =>
            of(
              appActions.showAlert({
                message: 'Failed on updating',
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    ),
  );

  deleteTodoEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTodoAction),
      exhaustMap((action) => {
        return this.todoService.deleteTodo(action.task).pipe(
          mergeMap(() => {
            return of(
              todoActions.deleteTodoSuccessAction({ task: action.task }),
              appActions.showAlert({
                message: 'Deleted todo',
                resultType: 'pass',
              }),
            );
          }),
          catchError((error) =>
            of(
              appActions.showAlert({
                message: 'Failed on deleting',
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    ),
  );
}
