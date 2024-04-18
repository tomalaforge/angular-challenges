import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ComponentCanDeactivate } from '../guards/pending-changes.guard';
import { UnloadGuardDirective } from '../guards/unload-window.directive';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  standalone: true,
  imports: [FormComponent, UnloadGuardDirective],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form appUnloadGuard />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements ComponentCanDeactivate {
  private dialog = inject(MatDialog);
  private component = viewChild(FormComponent);

  canDeactivate(): boolean | Observable<boolean> {
    if (this.component()?.form.dirty) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        disableClose: true,
      });
      return dialogRef.afterClosed();
    } else {
      return of(true);
    }
  }
}
