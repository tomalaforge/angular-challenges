/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { pipe, tap } from 'rxjs';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
  providers: [ComponentStore],
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private componentStore = inject(ComponentStore);
  private store = inject(UserStore);

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    if (role) {
      this.showTemplate(this.store.hasAnyRole(role));
    }
  }

  @Input('hasRoleIsAdmin') set isAdmin(isAdmin: boolean) {
    if (isAdmin) {
      this.showTemplate(this.store.isAdmin$);
    }
  }

  private readonly showTemplate = this.componentStore.effect<
    boolean | undefined
  >(
    pipe(
      tap((showTemplate) =>
        showTemplate ? this.addTemplate() : this.clearTemplate()
      )
    )
  );

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate() {
    this.viewContainer.clear();
  }
}
