import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as ActivityActions from './activity.actions';
import { ActivityService } from './activity.service';
import * as AppActions from '../app/app.actions';

@Injectable()
export class ActivityEffects {
  loadActivities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.initApp),
      concatMap(() =>
        this.ActivityService.fetchActivities().pipe(
          map((activities) =>
            ActivityActions.loadActivitiesSuccess({ activities })
          ),
          catchError(() => of(ActivityActions.loadActivitiesFailure()))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private ActivityService: ActivityService
  ) {}
}
