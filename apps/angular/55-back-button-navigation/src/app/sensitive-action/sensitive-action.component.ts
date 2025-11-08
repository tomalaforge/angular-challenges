import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateType } from '../can-decativate.guard';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent {
  readonly #dialog = inject(MatDialog);

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
    });
  }

  canDeactivate: () => CanDeactivateType = () => {
    if (this.#dialog.openDialogs.length === 0) {
      return true;
    }

    const confirmation = confirm(
      'You have open dialogs. Are you sure you want to leave this page?',
    );
    if (confirmation) {
      this.#dialog.closeAll();
    }
    return confirmation;
  };
}
