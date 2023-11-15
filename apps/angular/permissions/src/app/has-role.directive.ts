import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { UserStore } from './user.store';
import { ComponentStore } from '@ngrx/component-store';
import { Role } from './user.model';
import { pipe, tap } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
  providers: [ComponentStore],
})
export class HasRoleDirective {
  private readonly store = inject(UserStore);
  private readonly vcr = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly componentStore = inject(ComponentStore);

  private readonly showTemplate = this.componentStore.effect<
    boolean | undefined
  >(pipe(tap((show) => (show ? this.creatView() : this.clearView()))));

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    if (role) {
      this.showTemplate(this.store.hasAnyRole(role));
    }
  }

  @Input('hasRoleIsAdmin') set adminRole(isAdmin: boolean) {
    if (isAdmin) {
      this.showTemplate(this.store.isAdmin$);
    }
  }

  private creatView() {
    this.vcr.clear();
    this.vcr.createEmbeddedView(this.templateRef);
  }

  private clearView(): void {
    this.vcr.clear();
  }
}
