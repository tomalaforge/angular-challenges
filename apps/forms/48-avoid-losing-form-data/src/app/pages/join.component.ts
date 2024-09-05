import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  standalone: true,
  imports: [FormComponent],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form (unsavedChange)="onUnsavedChange($event)" />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent {
  unsavedChanges!: boolean;
  readonly dialog = inject(MatDialog);

  onUnsavedChange(unsavedChanges: boolean): void {
    if (unsavedChanges) {
      this.unsavedChanges = unsavedChanges;
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.unsavedChanges) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        disableClose: true,
        ariaDescribedBy:
          'Unsaved information modal. Hit Yes, Continue and agree to lost info or Stay on page button',
        ariaLabel: 'Unsaved Info',
      });
      return dialogRef.afterClosed().pipe(map((res: boolean) => res));
    } else {
      return true;
    }
  }
}
