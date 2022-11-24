import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { flatMap, mergeMap } from 'rxjs/operators';
import * as AppActions from './app.actions';
import * as ActivityActions from '../activity/activity.actions';
import * as UserActions from '../user/user.actions';

@Injectable()
export class AppEffects {
  initialiseApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.initApp),
      mergeMap(() => [
        ActivityActions.loadActivities(),
        UserActions.loadUsers(),
      ])
    )
  );

  constructor(private actions$: Actions) {}
}
