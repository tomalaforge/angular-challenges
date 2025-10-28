import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  selector: '[hasRole], [hasRoleSuperAdmin]',
  standalone: true,
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private userStore = inject(UserStore);

  role = input<Role | Role[] | null>(null, { alias: 'hasRole' });
  isAdmin = input(false, {
    alias: 'hasRoleSuperAdmin',
    transform: booleanAttribute,
  });

  private hasAccess = computed(() => {
    const isAdminFlag = this.isAdmin();
    const role = normalizeRoles(this.role());

    if (isAdminFlag) {
      return this.userStore.isAdmin();
    }

    if (role) {
      return this.userStore.hasAnyRole(role)();
    }
    return false;
  });

  private _effect = effect(() =>
    this.hasAccess() ? this.addTemplate() : this.clearTemplate(),
  );

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate() {
    this.viewContainer.clear();
  }
}

function normalizeRoles(role: Role | Role[] | null): Role[] | null {
  if (!role) return null;
  return Array.isArray(role) ? role : [role];
}
