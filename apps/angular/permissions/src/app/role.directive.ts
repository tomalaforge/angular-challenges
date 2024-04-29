import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { pipe, tap } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole], [roleAdmin]',
  standalone: true,
  providers: [ComponentStore],
})
export class RoleDirective {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private componentStore = inject(ComponentStore);
  private store = inject(UserStore);

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    if (role) {
      this.showTemplate(this.store.hasAnyRole(role));
    }
  }

  @Input('roleAdmin') set isAdmin(isAdmin: boolean) {
    if (isAdmin) {
      this.showTemplate(this.store.isAdminA$);
    }
  }

  private readonly showTemplate = this.componentStore.effect<
    boolean | undefined
  >(
    pipe(
      tap((showTemplate) =>
        showTemplate ? this.addTemplate() : this.clearTemplate(),
      ),
    ),
  );

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate() {
    this.viewContainer.clear();
  }
}
