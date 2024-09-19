import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeactivationCheck } from '../deactivation.guard';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent implements DeactivationCheck {
  readonly #dialog = inject(MatDialog);
  #dialogRef: MatDialogRef<DialogComponent> | undefined;

  canDeactivate(): boolean {
    if (this.#dialogRef) {
      this.#dialogRef.close();
      return false;
    }
    return true;
  }

  openDialog(): void {
    this.#dialogRef = this.#dialog.open(DialogComponent, {
      width: '250px',
      closeOnNavigation: false,
    });

    this.#dialogRef.afterClosed().subscribe(() => {
      this.#dialogRef = undefined;
    });
  }
}
