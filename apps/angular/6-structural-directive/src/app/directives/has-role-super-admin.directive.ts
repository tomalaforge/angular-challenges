import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRoleSuperAdmin]',
  standalone: true,
})
export class HasRoleSuperAdminDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    private userStore: UserStore,
  ) {}

  @Input() set hasRoleSuperAdmin(value: boolean) {
    if (value) {
      this.updateView();
    }
  }

  private updateView() {
    this.userStore.user$
      .pipe(
        map((user) => user?.isAdmin ?? false),
        distinctUntilChanged(),
      )
      .subscribe((isAdmin) => {
        if (isAdmin && !this.hasView) {
          this.vcr.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!isAdmin && this.hasView) {
          this.vcr.clear();
          this.hasView = false;
        }
      });
  }
}
