import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-animations-progress',
  template: '<mat-spinner></mat-spinner>',
  standalone: true,
  styles: [
    `
      ::ng-deep .mdc-dialog__surface {
        background: transparent !important;
        box-shadow: none !important;
      }
    `,
  ],
  imports: [MatProgressSpinnerModule],
})
export class DialogAnimationsProgressComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsProgressComponent>,
  ) {}
}
