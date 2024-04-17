import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard {
  canDeactivate(
    component: ComponentCanDeactivate,
  ): boolean | Observable<boolean> {
    return component.canDeactivate();
  }
}
