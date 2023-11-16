import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { UserStore } from '../../user.store';
import {
  injectDestroyService,
  provideDestroyService,
} from '@angular-challenges/shared/utils';
import { Role } from '../../user.model';
import { takeUntil } from 'rxjs';

@Directive({
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
  providers: [provideDestroyService()],
})
class HasRoleDirective implements OnInit {
  private destroy$ = injectDestroyService();
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private store = inject(UserStore);

  @Input('hasRole') role: Role | Role[] | undefined = undefined;
  @Input('hasRoleIsAdmin') isAdmin: boolean | undefined;

  ngOnInit(): void {
    if (this.isAdmin) {
      this.store.user$
        .pipe(takeUntil(this.destroy$))
        .subscribe((user) =>
          user?.isAdmin ? this.addTemplate() : this.clearTemplate()
        );
    } else if (this.role) {
      this.store
        .hasRole(this.role)
        .pipe(takeUntil(this.destroy$))
        .subscribe((hasPermission: boolean) =>
          hasPermission ? this.addTemplate() : this.clearTemplate()
        );
    } else {
      this.addTemplate();
    }
  }

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate() {
    this.viewContainer.clear();
  }
}

export { HasRoleDirective as HasRole };
