import { Dialog } from '@angular/cdk/dialog';
import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AlertDialogComponent } from '../ui/dialog.component';
import { IFormState } from '../ui/form-state';

export const AskBeforeLeaveDirtyForm: CanDeactivateFn<IFormState> = (
  component: IFormState,
) => {
  if (component.isDirty()) {
    const dialog = inject(Dialog);
    const dialogRef = dialog.open<boolean>(AlertDialogComponent, {
      height: '400px',
      width: '600px',
      panelClass: 'my-dialog',
    });

    return dialogRef.closed.pipe(
      map((result: boolean | undefined) => !!result),
    );
  }
  return true;
};
