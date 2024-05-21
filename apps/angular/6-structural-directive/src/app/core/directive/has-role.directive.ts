import { NgIf } from '@angular/common';
import {
  Directive,
  Injector,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
} from '@angular/core';
import { Role } from '../../user.model';
import { UserStore } from '../../user.store';

@Directive({
  standalone: true,
  selector: '[appHasRole], [appHasRoleSuperAdmin]',
  hostDirectives: [NgIf],
})
export class HasRoleDirective<T> {
  userStore = inject(UserStore);
  injector = inject(Injector);
  templateRef = inject(TemplateRef<T>);
  viewContainerRef = inject(ViewContainerRef);
  ngIfDirective = inject(NgIf);

  @Input()
  set appHasRoleSuperAdmin(flag: boolean) {
    this.ngIfViewCallback(() => {
      if (this.userStore.hasRoleSuperAdmin(flag)) {
        this.ngIfDirective.ngIf = true;
      }
    });
  }

  @Input()
  set appHasRole(roles: Role[]) {
    this.ngIfViewCallback(() => {
      if (this.userStore.hasRole(roles)) {
        this.ngIfDirective.ngIf = true;
      }
    });
  }

  private ngIfViewCallback(callback: () => void) {
    effect(
      () => {
        this.ngIfDirective.ngIf = false;

        return callback();
      },
      { injector: this.injector },
    );
  }
}
