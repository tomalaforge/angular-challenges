import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  private templateRef = inject(TemplateRef);
  private vcr = inject(ViewContainerRef);
  private readonly userStore = inject(UserStore);
  user$ = this.userStore.user$;
  @Input() hasRole: Role | Role[] | undefined;

  isValid(userRoles: Role[] | undefined): boolean {
    if (!this.hasRole || !userRoles) return false;

    if (Array.isArray(this.hasRole)) {
      return this.hasRole.some((role) => userRoles.includes(role));
    }

    return userRoles.includes(this.hasRole);
  }

  async ngOnInit() {
    if (!this.hasRole) {
      this.vcr.createEmbeddedView(this.templateRef);
    }
    this.user$.subscribe((user) => {
      if (!user?.isAdmin) {
        const isValid = user?.roles.length === 0 || this.isValid(user?.roles);
        if (isValid) {
          this.vcr.clear();
          this.vcr.createEmbeddedView(this.templateRef);
          return;
        } else {
          this.vcr.clear();
        }
      } else {
        this.vcr.clear();
        this.vcr.createEmbeddedView(this.templateRef);
      }
    });
  }
}
