/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @angular-eslint/directive-selector */
import { NgIf } from '@angular/common';
import { Directive, inject, Input } from '@angular/core';
import { RxEffects } from '@rx-angular/state/effects';
import { mergeMap, Observable, Subject } from 'rxjs';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
  hostDirectives: [NgIf],
  providers: [RxEffects],
})
export class HasRoleDirective {
  private store = inject(UserStore);
  private rxEffect = inject(RxEffects);
  private ngIf = inject(NgIf, { host: true });

  private show = new Subject<Observable<boolean | undefined>>();
  private show$ = this.show.asObservable().pipe(mergeMap((b) => b));

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    if (role) {
      this.show.next(this.store.hasAnyRole(role));
    }
  }

  @Input('hasRoleIsAdmin') set isAdmin(isAdmin: boolean) {
    if (isAdmin) {
      this.show.next(this.store.isAdmin$);
    }
  }

  constructor() {
    this.rxEffect.register(this.show$, this.showTemplate);
  }

  private showTemplate = (showTemplate: boolean | undefined) =>
    (this.ngIf.ngIf = showTemplate);
}
