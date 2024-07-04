import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { DialogService } from '../dialog.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent implements CanComponentDeactivate {
  readonly #dialogService = inject(DialogService);

  openDialog(): void {
    this.#dialogService.openDialog(DialogComponent, {
      width: '450px',
      data: { strategy: { type: 'default' } },
      closeOnNavigation: false,
    });
  }

  canDeactivate() {
    return (
      this.#dialogService.getStrategyType()?.onBackBrowserNavigation() ?? true
    );
  }
}
