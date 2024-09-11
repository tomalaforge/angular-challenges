import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AppActions } from '../app/app.actions';
import { UserActions } from './user.actions';
import { User } from './user.model';
import { UserService } from './user.service';

export const loadUsers = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(AppActions.initApp),
      concatMap(() =>
        userService.fetchUser().pipe(
          map((user: User) => UserActions.loadUsersSuccess({ user })),
          catchError((error) => of(UserActions.loadUsersFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
