import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole], [hasRoleSuperAdmin]',
  standalone: true,
})
export class HasRoleDirective {
  readonly hasRole = input<Role[] | Role>();
  readonly hasRoleSuperAdmin = input<boolean>(false);

  readonly userStore = inject(UserStore);
  private readonly vcr = inject(ViewContainerRef);

  constructor(templateRef: TemplateRef<any>) {
    const user = toSignal(this.userStore.user$);

    effect(() => {
      this.vcr.clear();
      if (this.hasRoleSuperAdmin()) {
        if (user()?.isAdmin) {
          this.vcr.createEmbeddedView(templateRef);
        }
      } else {
        const hasRole = this.hasRole();
        if (hasRole) {
          const userRoles = user()?.roles ?? [];
          const roles = Array.isArray(hasRole) ? hasRole : [hasRole];
          const matches = roles.some((role) => userRoles.includes(role));
          if (matches) {
            this.vcr.createEmbeddedView(templateRef);
          }
        } else {
          this.vcr.createEmbeddedView(templateRef);
        }
      }
    });
  }
}
