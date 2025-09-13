import {
  Directive,
  EmbeddedViewRef,
  inject,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { Role, User } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[appHasRole],[appHasRoleSuperAdmin]',
  standalone: true,
})
export class PermissionDirective implements OnInit {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly userStore = inject(UserStore);

  appHasRole = input<string | string[] | null>(null);
  appHasRoleSuperAdmin = input<boolean | string>(true);

  private currentEmbeddedView: EmbeddedViewRef<ViewRef> | null = null;

  ngOnInit() {
    this.manageSubscriptions();
  }

  private manageSubscriptions(): void {
    this.userStore.user$.subscribe({
      next: (user) => {
        if (!user) {
          this.viewContainerRef.clear();
          return;
        }
        const renderView = this.canSectionBeVisible(user);
        if (renderView) {
          this.createView();
        } else {
          this.clearView();
        }
      },
      error: () => {
        // addition error handling goes here
        this.clearView();
      },
    });
  }

  private createView(): void {
    this.currentEmbeddedView ??= this.viewContainerRef.createEmbeddedView(
      this.templateRef,
    );
  }

  private clearView(): void {
    this.viewContainerRef.clear();
    this.currentEmbeddedView = null;
  }

  private canSectionBeVisible(activeUser: User): boolean {
    const { roles } = activeUser;
    const hasRole = this.appHasRole();
    const isSuperAdmin = this.appHasRoleSuperAdmin();

    if (Array.isArray(hasRole) && hasRole.length > 0) {
      return hasRole.some((rolName: string) => roles.includes(rolName as Role));
    }

    if (typeof hasRole === 'string') {
      return roles.includes(hasRole as Role);
    }

    return activeUser.isAdmin === !!isSuperAdmin;
  }
}
