import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AppActions } from '../app.action';
import { ActivitiesApiActions } from './activity.actions';
import { ActivityService } from './activity.service';

@Injectable()
export class ActivityEffects {
  loadActivities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.init),
      concatMap(() =>
        this.ActivityService.fetchActivities().pipe(
          map((activities) =>
            ActivitiesApiActions.loadActivitiesSuccess({ activities })
          ),
          catchError((error) =>
            of(ActivitiesApiActions.loadActivitiesFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private ActivityService: ActivityService
  ) {}
}
