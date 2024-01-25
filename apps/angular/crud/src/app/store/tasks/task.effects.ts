import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { appActions } from '../commons/app.action';
import { taskActions } from './task.action';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private service: TaskService,
  ) {}

  loadTasksEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.loadTasksAction),
      exhaustMap((action) => {
        return this.service.getAllData().pipe(
          map((data) => {
            return taskActions.loadTasksSuccess({ list: data });
          }),
          catchError((error) =>
            of(
              appActions.showAlert({
                message: 'Fail fetching data:: ' + error.message,
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    ),
  );

  updTaskEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.updTaskAction),
      exhaustMap((action) => {
        return this.service.putEntity(action.task).pipe(
          mergeMap((data) => {
            return of(
              taskActions.updTaskSuccess({ task: action.task }),
              appActions.showAlert({
                message: 'Task updated',
                resultType: 'pass',
              }),
            );
          }),
          catchError((error) =>
            of(
              appActions.showAlert({
                message: 'Fail updating data:: ' + error.message,
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    ),
  );

  delTaskEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.delTaskAction),
      exhaustMap((action) => {
        return this.service.delEntity(action.task).pipe(
          mergeMap((data) => {
            return of(
              taskActions.delTaskSuccess({ task: action.task }),
              appActions.showAlert({
                message: 'Task deleted',
                resultType: 'pass',
              }),
            );
          }),
          catchError((error) =>
            of(
              appActions.showAlert({
                message: 'Fail deleting data:: ' + error.message,
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    ),
  );
}
