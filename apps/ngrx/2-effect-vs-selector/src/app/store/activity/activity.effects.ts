import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as ActivityActions from './activity.actions';
import { ActivityService } from './activity.service';

@Injectable()
export class ActivityEffects implements OnInitEffects {
  ngrxOnInitEffects = ActivityActions.loadActivities;

  loadActivities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActivityActions.loadActivities),
      concatMap(() =>
        this.ActivityService.fetchActivities().pipe(
          map((activities) =>
            ActivityActions.loadActivitiesSuccess({ activities }),
          ),
          catchError((error) =>
            of(ActivityActions.loadActivitiesFailure({ error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private ActivityService: ActivityService,
  ) {}
}
