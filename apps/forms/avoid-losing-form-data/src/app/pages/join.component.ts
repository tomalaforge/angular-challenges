import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  standalone: true,
  imports: [FormComponent],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form (hasValues)="hasValues.set($event)" />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent {
  #dialog = inject(Dialog);
  protected hasValues = signal(false);

  canDeactivate() {
    if (this.hasValues()) {
      const dialogRef = this.#dialog.open(AlertDialogComponent, {
        role: 'alertdialog',
        disableClose: true,
      });

      return dialogRef.closed;
    }

    return true;
  }
}
