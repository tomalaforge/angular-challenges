import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AppActions } from '../app.action';
import { UserApiActions } from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.init),
      concatMap(() =>
        this.userService.fetchUser().pipe(
          map((user) => UserApiActions.loadUsersSuccess({ user })),
          catchError((error) => of(UserApiActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private userService: UserService) {}
}
