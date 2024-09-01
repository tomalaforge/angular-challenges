import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from './user.service';

@Directive({
  selector: '[hasRoleSuperAdmin]',
})
export class HasRoleSuperAdminDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {
    this.userService.currentUser$.subscribe(user => {
      this.updateView(user.isAdmin);
    });
  }

  @Input()
  set hasRoleSuperAdmin(isSuperAdmin: boolean) {
    this.userService.currentUser$.subscribe(user => {
      this.updateView(user.isAdmin);
    });
  }

  private updateView(isSuperAdmin: boolean) {
    if (isSuperAdmin) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

