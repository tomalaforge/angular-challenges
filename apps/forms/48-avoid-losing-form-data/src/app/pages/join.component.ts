import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  imports: [FormComponent],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form (hasValue)="hasValue = $event" />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent {
  hasValue = false;
  dialog = inject(Dialog);

  hasUnsavedChanges() {
    if (this.hasValue) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        disableClose: true,
        ariaLabel: 'Alert dialog',
        ariaDescribedBy: 'alert-description',
      });
      return dialogRef.closed.pipe(map((res) => res));
    } else {
      return true;
    }
  }
}
