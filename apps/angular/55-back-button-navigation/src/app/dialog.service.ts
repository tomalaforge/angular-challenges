import { ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { take, tap } from 'rxjs';
import {
  DialogStrategy,
  DialogStrategyMap,
  DialogStrategyType,
} from './dialog-strategy';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly #dialog = inject(MatDialog);
  readonly #dialogsStrategyState: {
    id: string;
    type: DialogStrategy;
    active: boolean;
  }[] = [];

  readonly #injector = inject(Injector);

  openDialog<T extends ComponentType<any>, Z extends MatDialogConfig<any>>(
    component: T,
    config: Z,
  ) {
    const dialogRef = this.#dialog.open<T, Z>(component, config);

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap(() => this.removeDialogStrategyStateById(dialogRef.id)),
      )
      .subscribe();
  }

  setStrategy(type: DialogStrategyType) {
    this.#dialog.openDialogs.forEach((d) => {
      const state = this.getDialogStrategyStateById(d.id);

      if (!state) {
        this.addDialogStrategyState(d.id, type);
      }
    });
  }

  getStrategyType() {
    const active = this.getActiveDialog();

    if (!active) {
      return null;
    }

    return this.getDialogStrategyStateById(active.id)?.type;
  }

  closeActiveDialog() {
    const activeDialog = this.#dialogsStrategyState.find((d) => d.active);

    if (!activeDialog) {
      return;
    }

    this.#dialog.getDialogById(activeDialog.id)?.close();
  }

  getActiveDialog() {
    return this.#dialogsStrategyState.find((d) => d.active);
  }

  addDialogStrategyState(id: string, type: DialogStrategyType) {
    const t = this.#injector.get<DialogStrategy>(DialogStrategyMap.get(type));

    this.#dialogsStrategyState.map((x) => (x.active = false));

    this.#dialogsStrategyState.push({ id, type: t, active: true });
  }

  getDialogStrategyStateById(id: string) {
    return this.#dialogsStrategyState.find((s) => s.id === id);
  }

  removeDialogStrategyStateById(id: string) {
    const indexToRemove = this.#dialogsStrategyState.findIndex(
      (d) => d.id === id,
    );

    if (indexToRemove > 0) {
      this.#dialogsStrategyState[indexToRemove - 1] = {
        ...this.#dialogsStrategyState[indexToRemove - 1],
        active: true,
      };
    }

    this.#dialogsStrategyState.splice(indexToRemove, 1);
  }

  getDialogsStrategyState() {
    return this.#dialogsStrategyState;
  }
}
