/* eslint-disable @angular-eslint/directive-selector */
import { NgIf } from '@angular/common';
import {
  Directive,
  Input,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  selector: '[hasRole], [hasRoleSuperAdmin]',
  standalone: true,
  hostDirectives: [NgIf],
})
export class HasRoleDirective {
  private store = inject(UserStore);
  private ngIf = inject(NgIf, { host: true });

  private readonly _isAdmin = signal<boolean>(false);
  private readonly _role = signal<Role | Role[] | undefined>(undefined);

  private readonly showTemplate = computed(() => {
    if (this._isAdmin()) {
      return this.store.user().isAdmin;
    } else {
      return this.store.hasAnyRole(this._role());
    }
  });

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    this._role.set(role);
  }

  @Input('hasRoleSuperAdmin') set isAdmin(isAdmin: boolean) {
    this._isAdmin.set(isAdmin);
  }

  constructor() {
    effect(() => {
      this.ngIf.ngIf = this.showTemplate();
    });
  }
}
