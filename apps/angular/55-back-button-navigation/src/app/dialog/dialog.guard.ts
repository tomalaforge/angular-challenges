import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DIALOG_STRATEGY } from './dialog-strategy.interface';

@Injectable({ providedIn: 'root' })
export class DialogGuard implements CanDeactivate<unknown> {
  private dialog = inject(MatDialog);

  canDeactivate(component: unknown): Observable<boolean> {
    const dialogRef =
      this.dialog.openDialogs[this.dialog.openDialogs.length - 1];
    const strategy = inject(DIALOG_STRATEGY, { optional: true });

    if (dialogRef && strategy) {
      return strategy.handleBackButton(dialogRef);
    }

    return of(true);
  }
}
