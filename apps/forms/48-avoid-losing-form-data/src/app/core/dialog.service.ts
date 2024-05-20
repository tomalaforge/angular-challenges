import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { BasePortalOutlet, ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(Dialog);

  showDialog<T extends ComponentType<unknown>>(
    component: T,
    config: DialogConfig<T, DialogRef<unknown, unknown>, BasePortalOutlet>,
  ) {
    const dialogRef = this.dialog.open(component, config);

    return dialogRef.closed as Observable<boolean>;
  }
}
