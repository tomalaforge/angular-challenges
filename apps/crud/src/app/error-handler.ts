import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';

export const createErrorHandler = () => {
  const snackbar = inject(MatSnackBar);
  return <T>() => {
    return (source: Observable<T>) =>
      source.pipe(
        catchError((error: Error) => {
          snackbar.open(error?.message || 'Something went wrong', undefined, {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 1000,
          });
          return of(null);
        })
      );
  };
};
