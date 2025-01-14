import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
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
}
