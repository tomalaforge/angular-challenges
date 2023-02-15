/* eslint-disable @angular-eslint/directive-selector */
import { provideDestroyService } from '@angular-challenges/shared/utils';
import { NgIfContext } from '@angular/common';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  selector: '[hasRole], [hasRoles],[hasRoleIsAdmin]',
  standalone: true,
  providers: [provideDestroyService()],
})
export class HasRoleDirective {
  @Input()
  set hasRole(role: Role | undefined) {
    if (role) {
      this.store.user$.subscribe((user) => {
        user?.roles?.includes(role)
          ? this.addTemplate()
          : this.addElseTemplate();
      });
    }
  }

  @Input()
  set hasRoles(roles: Role[] | undefined) {
    if (roles && roles?.length > 0) {
      this.store.hasAnyRole(roles).subscribe((hasRole) => {
        hasRole ? this.addTemplate() : this.addElseTemplate();
      });
    }
  }

  @Input()
  set hasRoleIsAdmin(isAdmin: boolean) {
    if (isAdmin) {
      this.store.isAdmin$.subscribe((isAdmin) => {
        isAdmin ? this.addTemplate() : this.addElseTemplate();
      });
    }
  }

  @Input('hasRoleIsAdminElse')
  else?: TemplateRef<NgIfContext> | null;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private store: UserStore
  ) {}

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private addElseTemplate() {
    this.viewContainer.clear();
    this.else && this.viewContainer.createEmbeddedView(this.else);
  }
}
