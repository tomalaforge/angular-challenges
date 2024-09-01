import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from './user.service';

@Directive({
  selector: '[hasRole]',
})
export class HasRoleDirective {
  private roles: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {
    this.userService.currentUser$.subscribe(user => {
      this.updateView(user.roles);
    });
  }

  @Input()
  set hasRole(roles: string[] | string) {
    this.roles = Array.isArray(roles) ? roles : [roles];
    this.userService.currentUser$.subscribe(user => {
      this.updateView(user.roles);
    });
  }

  private updateView(userRoles: string[]) {
    const hasRole = this.roles.some(role => userRoles.includes(role));
    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
