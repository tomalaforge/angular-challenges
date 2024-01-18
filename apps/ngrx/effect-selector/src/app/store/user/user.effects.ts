import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.userService.fetchUser().pipe(
          map((user) => UserActions.loadUsersSuccess({ user })),
          catchError((error) => of(UserActions.loadUsersFailure({ error }))),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
