import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

// NOTE : this is just the dialog content, you need to implement dialog logic

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <div role="alert" class="rounded-xl border border-gray-100 bg-white p-5">
      <h3 mat-dialog-title class="block text-xl font-medium text-red-600">
        You have unsaved information!
      </h3>

      <p mat-dialog-content class="mt-1 text-gray-700">
        Do you want to continue and lose them?
      </p>

      <div mat-dialog-actions align="end" class="mt-4 flex gap-2">
        <button
          mat-button
          [aria-label]="'Continue and agree with losing information'"
          [mat-dialog-close]="true"
          class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          Yes continue
        </button>

        <button
          mat-button
          [aria-label]="'Stay on page'"
          [mat-dialog-close]="false"
          class="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-50">
          Stay on page
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent {}
