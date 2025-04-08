import { Injectable, inject } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog.service';

export type DialogStrategyType = 'default' | 'confirm';

export type DialogData = {
  strategy: {
    type: DialogStrategyType;
  };
};

export abstract class DialogStrategy {
  protected readonly dialogService = inject(DialogService);

  abstract onBackBrowserNavigation(): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DefaultDialogStrategy extends DialogStrategy {
  override onBackBrowserNavigation(): boolean {
    this.dialogService.closeActiveDialog();

    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogStrategy extends DialogStrategy {
  override onBackBrowserNavigation(): boolean {
    this.dialogService.openDialog(ConfirmDialogComponent, {
      width: '250px',
      closeOnNavigation: false,
    });

    return false;
  }
}

export const DialogStrategyMap = new Map<DialogStrategyType, any>([
  ['default', DefaultDialogStrategy],
  ['confirm', ConfirmDialogStrategy],
]);
