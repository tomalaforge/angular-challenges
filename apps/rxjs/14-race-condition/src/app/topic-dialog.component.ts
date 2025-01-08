import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>Show all Topics</h1>
    <div mat-dialog-content>
      <ul>
        <li *ngFor="let topic of data.topics">
          {{ topic }}
        </li>
      </ul>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  imports: [MatDialogModule, MatButtonModule, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicModalComponent {
  data = inject(MAT_DIALOG_DATA);
}
