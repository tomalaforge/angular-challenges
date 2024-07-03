import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SimpleActionComponent } from '../simple-action/simple-action.component';

type CanDeactivateType =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;

export interface CanComponentDeactivate {
  canDeactivate: () => CanDeactivateType;
}

@Injectable({
  providedIn: 'root',
})
export class SimpleActionDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(component: SimpleActionComponent): CanDeactivateType {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
