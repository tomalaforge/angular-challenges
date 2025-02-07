import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Role, User } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private roles: Role[] = [];
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    private userStore: UserStore,
  ) {}

  @Input() set hasRole(roleOrRoles: Role | Role[]) {
    this.roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
    this.updateView();
  }

  private updateView() {
    this.userStore.user$
      .pipe(
        map((user) => this.matchRoles(user)),
        distinctUntilChanged(),
      )
      .subscribe((hasRole) => {
        if (hasRole && !this.hasView) {
          this.vcr.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!hasRole && this.hasView) {
          this.vcr.clear();
          this.hasView = false;
        }
      });
  }

  private matchRoles(user?: User): boolean {
    if (!user) return false;
    if (user.isAdmin) return true;
    return this.roles.some((role) => user.roles.includes(role));
  }
}
