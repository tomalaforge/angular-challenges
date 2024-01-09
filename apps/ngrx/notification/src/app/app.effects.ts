import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { appActions } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(
    private action$: Actions,
    private _snackbar: MatSnackBar,
  ) {}

  showAlert = createEffect(() => {
    return this.action$.pipe(
      ofType(appActions.showAlert),
      exhaustMap((action) => {
        return this.snackbarAlert(action.message, action.component)
          .afterDismissed()
          .pipe(
            map(() => {
              return appActions.emptyAlert();
            }),
          );
      }),
    );
  });

  snackbarAlert(message: string, component: string = 'Student') {
    const _class =
      component === 'Student'
        ? 'green-snackbar'
        : component === 'Teacher'
          ? 'red-snackbar'
          : 'orange-snackbar';
    return this._snackbar.open(message, 'DISMISS', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [_class],
      duration: 1250,
    });
  }
}
