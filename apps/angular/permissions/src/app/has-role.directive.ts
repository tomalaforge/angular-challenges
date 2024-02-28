import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
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

  @Input('appHasRole') role: Role[] = [];
  @Input('appHasRoleIsAdmin') isAdmin = false;

  constructor() {
    effect(() => {
      if (this.isAdmin) {
        const isAdmin = this.store.isAdmin();
        isAdmin ? this.addTemplate() : this.clearTemplate();
      } else if (this.role) {
        this.store.hasAnyRole(this.role)
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
