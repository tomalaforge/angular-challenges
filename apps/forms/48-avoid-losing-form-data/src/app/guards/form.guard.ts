import { Dialog } from '@angular/cdk/dialog';
import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

export const formGuard: CanDeactivateFn<FormComponent> = (
  component,
): Observable<boolean> | boolean => {
  const dialog = inject(Dialog);

  if (component.form.dirty) {
    const dialogRef = dialog.open<boolean>(AlertDialogComponent, {
      disableClose: true,
      ariaDescribedBy: 'alert-dialog-description',
      ariaLabelledBy: 'alert-dialog-title',
    });

    return dialogRef.closed.pipe(
      map((result) => {
        if (result) {
          component.form.reset();
          return true;
        }
        return false;
      }),
    );
  }

  return true;
};
