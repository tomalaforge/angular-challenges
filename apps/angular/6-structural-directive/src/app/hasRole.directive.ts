import { NgIf } from '@angular/common';
import { Directive, effect, inject, input } from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole],[hasRoleSuperAdmin]',
  standalone: true,
  hostDirectives: [NgIf],
})
export class HasRoleDirective {
  $ngIf = inject(NgIf);

  hasRole = input<Role | Role[] | undefined>();
  hasRoleSuperAdmin = input<boolean>(false);

  userStore = inject(UserStore);
  user$ = this.userStore.user$;

  constructor() {
    effect(() => {
      this.$ngIf.ngIf =
        this.userStore.hasRoles(this.hasRole()) ||
        (this.userStore.user$()?.isAdmin && this.hasRoleSuperAdmin());
    });
  }
}
