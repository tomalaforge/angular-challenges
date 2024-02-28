import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';

import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  standalone: true,
  selector: '[appHasRole], [appHasRoleIsAdmin]',
})
export class HasRoleDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly store = inject(UserStore);

  readonly appHasRole = input<Role[]>([]);
  readonly appHasRoleIsAdmin = input<boolean>(false);

  constructor() {
    effect(() => {
      if (this.appHasRoleIsAdmin()) {
        const isAdmin = this.store.isAdmin();
        isAdmin ? this.addTemplate() : this.clearTemplate();
      } else if (this.appHasRole()) {
        this.store.hasAnyRole(this.appHasRole())
          ? this.addTemplate()
          : this.clearTemplate();
      } else {
        this.addTemplate();
      }
    });
  }

  private addTemplate(): void {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate(): void {
    this.viewContainer.clear();
  }
}
