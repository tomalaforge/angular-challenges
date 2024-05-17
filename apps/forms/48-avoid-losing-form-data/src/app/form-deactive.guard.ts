import { Dialog } from '@angular/cdk/dialog';
import { inject } from '@angular/core';
import { AlertDialogComponent } from './ui/dialog.component';

export interface FormDeactivateCheck {
  hasUnsavedChanges: () => boolean;
}

export function FormDeactivateGuard(component: FormDeactivateCheck) {
  if (component.hasUnsavedChanges()) {
    return inject(Dialog).open(AlertDialogComponent, { disableClose: true })
      .closed;
  }

  return true;
}
