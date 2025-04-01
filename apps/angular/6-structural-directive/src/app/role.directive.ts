import {
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
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole], [hasRoleSuperAdmin]',
  standalone: true,
})
export class RoleDirective {
  hasRole = input<Role | Role[]>();
  hasRoleSuperAdmin = input<boolean>(false);

  private store = inject(UserStore);

  private templateRef = inject(TemplateRef);
  private vcf = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.hasRoleSuperAdmin() && this.store.isAdmin())
        return this.createView();

      const userHasRole = this.store.userHasRole(this.hasRole());

      userHasRole ? this.createView() : this.clearView();
    });
  }

  private createView() {
    this.vcf.clear();
    this.vcf.createEmbeddedView(this.templateRef);
  }

  private clearView() {
    this.vcf.clear();
  }
}
