import {
  Directive,
  Injector,
  Input,
  Signal,
  TemplateRef,
  ViewContainerRef,
  computed,
  effect,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { UserStore } from './user.store';
import { Role } from './user.model';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole],[hasRoleIsAdmin]',
  standalone: true,
  providers: [],
})
export class HasRoleDirective {
  private readonly store = inject(UserStore);
  private readonly vcr = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly injector = inject(Injector);

  private readonly showTemplate = (show: Signal<boolean>) =>
    runInInjectionContext(this.injector, () =>
      effect(() => (show() ? this.creatView() : this.clearView())),
    );

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    if (role) {
      this.showTemplate(computed(() => this.store.hasAnyRole(role)));
    }
  }

  @Input('hasRoleIsAdmin') set adminRole(isAdmin: boolean) {
    if (isAdmin) {
      this.showTemplate(this.store.isAdmin);
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
