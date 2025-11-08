import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CanDeactivate,
  GuardResult,
  MaybeAsync,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export type CanDeactivateType =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;

export interface CanComponentDeactivate {
  canDeactivate?: () => CanDeactivateType;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  readonly #dialog = inject(MatDialog);

  canDeactivate(component: CanComponentDeactivate): MaybeAsync<GuardResult> {
    return component.canDeactivate
      ? component.canDeactivate()
      : this.defaultCanDeactivate();
  }

  defaultCanDeactivate(): boolean {
    if (this.#dialog.openDialogs.length === 0) {
      return true;
    }
    this.#dialog.closeAll();
    return false;
  }
}
