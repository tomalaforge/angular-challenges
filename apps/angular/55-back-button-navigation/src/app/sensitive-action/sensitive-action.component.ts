import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Create this component for confirmation
import { Location } from '@angular/common';


@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent {
  readonly #dialog = inject(MatDialog);
  private sensitiveDialogOpen = false; // Track if a sensitive dialog is open

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
    });
  }

  if (isSensitive) {
    this.sensitiveDialogOpen = true;

    // Handle back button for sensitive dialogs
    this.subscription = this.#location.subscribe(() => {
      if (this.sensitiveDialogOpen) {
        this.#dialog.open(ConfirmDialogComponent, {
          width: '300px',
          data: { message: 'You have unsaved changes. Are you sure you want to leave?' }
        }).afterClosed().subscribe(confirmed => {
          if (confirmed) {
            this.sensitiveDialogOpen = false; // Allow navigation
          }
        });
      }
    });
  }

  dialogRef.afterClosed().subscribe(() => {
    this.sensitiveDialogOpen = false;
    this.subscription?.unsubscribe();
  });


ngOnDestroy(): void {
  this.subscription?.unsubscribe(); // Clean up on destroy
}





}
