import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_STRATEGY } from '../dialog/dialog-strategy.interface';
import { DialogComponent } from '../dialog/dialog.component';
import { SimpleDialogStrategy } from '../dialog/strategies/simple-dialog.strategy';

@Component({
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
  providers: [{ provide: DIALOG_STRATEGY, useClass: SimpleDialogStrategy }],
})
export class SimpleActionComponent {
  readonly #dialog = inject(MatDialog);

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
    });
  }
}
