import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading-dialog',
  template: `
    <mat-dialog-content>
      <mat-spinner></mat-spinner>
    </mat-dialog-content>
  `,
  standalone: true,
  imports: [MatDialogContent, MatProgressSpinnerModule],
})
export class LoadingDialog {}
