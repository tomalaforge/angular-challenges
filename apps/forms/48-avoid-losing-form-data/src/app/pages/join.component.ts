import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  viewChild,
} from '@angular/core';
import { map } from 'rxjs';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  imports: [FormComponent, DialogModule],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements CanComponentDeactivate {
  dialog = inject(Dialog);

  formComponent = viewChild(FormComponent);

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    const form = this.formComponent()?.form;
    if (!form?.dirty || !form?.value) {
      return;
    }

    event.preventDefault();
  }

  canDeactivate = () => {
    const form = this.formComponent()?.form;

    if (form?.dirty && form?.value) {
      const dialogRef = this.dialog.open<boolean>(AlertDialogComponent, {
        role: 'alertdialog',
        ariaDescribedBy: 'dialog-description',
        ariaLabelledBy: 'dialog-title',
        ariaModal: true,
      });
      return dialogRef.closed.pipe(map((result) => !!result));
    }

    return true;
  };
}
