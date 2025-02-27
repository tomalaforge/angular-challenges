import { InjectionToken } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface DialogBackButtonStrategy {
  handleBackButton(dialogRef: MatDialogRef<unknown>): Observable<boolean>;
}

export const DIALOG_STRATEGY = new InjectionToken<DialogBackButtonStrategy>(
  'DIALOG_STRATEGY',
);
