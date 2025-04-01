import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { DialogService } from '../dialog.service';
import { SensitiveDialogComponent } from '../sensitive-dialog/sensitive-dialog.component';

@Component({
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent implements CanComponentDeactivate {
  readonly #dialogService = inject(DialogService);

  openDialog(): void {
    this.#dialogService.openDialog(SensitiveDialogComponent, {
      width: '450px',
      data: { strategy: { type: 'confirm' } },
      closeOnNavigation: false,
    });
  }

  canDeactivate() {
    return (
      this.#dialogService.getStrategyType()?.onBackBrowserNavigation() ?? true
    );
  }
}
