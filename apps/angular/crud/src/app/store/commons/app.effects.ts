import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { appActions } from './app.action';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  showAlert = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.showAlert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message, action.resultType)
          .afterDismissed()
          .pipe(
            map(() => {
              return appActions.emptyAction();
            }),
          );
      }),
    ),
  );

  showSnackBarAlert(message: string, resultType: string = 'fail') {
    return this.snackBar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      //duration: 5000,
      panelClass: resultType === 'pass' ? 'green-snackbar' : 'red-snackbar',
    });
  }
}
