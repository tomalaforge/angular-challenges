import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CanComponentDeactivate } from '../guards/simpleactivationguard.guard';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent implements CanComponentDeactivate {
  readonly #dialog = inject(MatDialog);

  canDeactivate(): boolean {
    confirm('Are you sure?');
    return false;
  }

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
    });
  }
}
