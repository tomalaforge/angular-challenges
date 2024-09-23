import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeactivationCheck } from '../deactivation.guard';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent implements DeactivationCheck {
  readonly #dialog = inject(MatDialog);
  #dialogRef: MatDialogRef<DialogComponent> | undefined;

  canDeactivate(): boolean {
    if (this.#dialogRef) {
      if (confirm('Are you sure you want to leave?')) {
        this.#dialogRef.close();
      }
      return false;
    }
    return true;
  }

  openDialog(): void {
    this.#dialogRef = this.#dialog.open(DialogComponent, {
      width: '250px',
      closeOnNavigation: false,
    });

    this.#dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed())
      .subscribe(() => (this.#dialogRef = undefined));
  }
}
