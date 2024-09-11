import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AppActions } from '../app/app.actions';
import { ActivityActions } from './activity.actions';
import { Activity } from './activity.model';
import { ActivityService } from './activity.service';

export const loadActivities = createEffect(
  (actions$ = inject(Actions), activityService = inject(ActivityService)) => {
    return actions$.pipe(
      ofType(AppActions.initApp),
      concatMap(() =>
        activityService.fetchActivities().pipe(
          map((activities: Activity[]) =>
            ActivityActions.loadActivitiesSuccess({ activities }),
          ),
          catchError((error) =>
            of(ActivityActions.loadActivitiesFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
