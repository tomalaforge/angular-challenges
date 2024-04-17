import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';

// NOTE : this is just the dialog content, you need to implement dialog logic

@Component({
  standalone: true,
  imports: [MatDialogClose],
  template: `
    <div
      role="alertdialog"
      aria-labelledby="alert-title"
      aria-describedby="alert-description"
      class="rounded-xl border border-gray-100 bg-white p-5">
      <h3 id="alert-title" class="block text-xl font-medium text-red-600">
        Confirmation
      </h3>

      <p id="alert-description" class="mt-1 text-gray-700">
        You have unsaved information! Do you want to continue and lose them?
      </p>

      <div class="mt-4 flex gap-2">
        <button
          [matDialogClose]="true"
          class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          Yes continue
        </button>

        <button
          [matDialogClose]="false"
          class="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-50">
          Stay on page
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent {}
