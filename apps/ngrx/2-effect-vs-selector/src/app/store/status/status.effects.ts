import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, concatMap, map } from 'rxjs';
import { selectActivities } from '../activity/activity.selectors';
import { selectUser } from '../user/user.selectors';
import * as StatusActions from './status.actions';
import { Status } from './status.model';

@Injectable()
export class StatusEffects {
  loadStatuses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StatusActions.loadStatuses),
      concatMap(() =>
        combineLatest([
          this.store.select(selectUser),
          this.store.select(selectActivities),
        ]).pipe(
          map(([user, activities]): Status[] => {
            if (user?.isAdmin) {
              return activities.reduce(
                (status: Status[], activity): Status[] => {
                  const index = status.findIndex(
                    (s) => s.name === activity.type,
                  );
                  if (index === -1) {
                    return [
                      ...status,
                      { name: activity.type, teachers: [activity.teacher] },
                    ];
                  } else {
                    status[index].teachers.push(activity.teacher);
                    return status;
                  }
                },
                [],
              );
            }
            return [];
          }),
          map((statuses) => StatusActions.loadStatusesSuccess({ statuses })),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
  ) {}
}
