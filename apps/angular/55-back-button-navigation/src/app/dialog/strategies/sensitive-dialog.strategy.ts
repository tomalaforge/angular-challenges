import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { DialogBackButtonStrategy } from '../dialog-strategy.interface';

@Injectable({ providedIn: 'root' })
export class SensitiveDialogStrategy implements DialogBackButtonStrategy {
  private dialog = inject(MatDialog);

  handleBackButton(dialogRef: MatDialogRef<unknown>): Observable<boolean> {
    const confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to leave?' },
    });

    return from(confirmRef.afterClosed()).pipe(
      map((result) => {
        if (result) {
          dialogRef.close();
          return false;
        }
        return false;
      }),
    );
  }
}
