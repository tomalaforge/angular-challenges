import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects implements OnInitEffects {
  ngrxOnInitEffects = UserActions.loadUsers;

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

  toggleUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap((user) =>
        this.userService.updateUser(user).pipe(
          map(() => UserActions.updateUsersSuccess()),
          catchError((error) => of(UserActions.updateUsersFailure({ error }))),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
