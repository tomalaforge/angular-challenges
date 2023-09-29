/* eslint-disable @angular-eslint/directive-selector */
import { NgIf } from '@angular/common';
import { Directive, inject, Input } from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';
import { combineLatest, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[hasRole], [hasRoleSuperAdmin]',
  standalone: true,
  hostDirectives: [{ directive: NgIf }],
})
export class HasRoleDirective {
  #store = inject(UserStore);
  #ngIfDirective = inject(NgIf);

  @Input('hasRole') role: Role | Role[] = [];
  @Input('hasRoleSuperAdmin') isAdmin = false;

  constructor() {
    this.#store.user$
      .pipe(
        switchMap(() =>
          combineLatest([
            this.#store.hasAnyRole(this.role),
            this.#store.isAdmin$,
          ])
        ),
        tap(
          ([hasRole, isAdmin]) =>
            (this.#ngIfDirective.ngIf = hasRole || isAdmin)
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
