import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export type CanDeactivateType = boolean | Observable<boolean>;
export interface ComponentCanDeactivate {
  canDeactivate: () => CanDeactivateType;
}

export const canDeactivateGuard: CanDeactivateFn<ComponentCanDeactivate> = (
  component: ComponentCanDeactivate,
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
