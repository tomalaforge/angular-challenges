import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent {
  readonly #dialog = inject(MatDialog);
  readonly #location = inject(Location);

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
    });
  }

  // Listen for back button clicks while dialog is open
  this.subscription = this.#location.subscribe(() => {
    dialogRef.close();
  });

  // Stop listening once the dialog is closed
  dialogRef.afterClosed().subscribe(() => {
    this.subscription?.unsubscribe();
  });

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Clean up on destroy
  }


}
