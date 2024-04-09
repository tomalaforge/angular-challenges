import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  booleanAttribute,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({ selector: '[appHasRole]', standalone: true })
export class HasRoleDirective {
  @Input({ required: true }) appHasRole!: Role[];

  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private user$ = toObservable(inject(UserStore).user);

  constructor() {
    this.user$
      .pipe(
        tap(() => this.viewContainer.clear()),
        filter((user) => {
          const hasRole = user?.roles.some((r) => this.appHasRole.includes(r));

          return !!hasRole;
        }),
        tap(() => this.viewContainer.createEmbeddedView(this.templateRef)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}

@Directive({ selector: '[appHasRoleSuperAdmin]', standalone: true })
export class HasRoleSuperAdminDirective {
  @Input({ required: true, transform: booleanAttribute }) appHasRoleSuperAdmin =
    true;

  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private user$ = toObservable(inject(UserStore).user);

  constructor() {
    this.user$
      .pipe(
        tap(() => this.viewContainer.clear()),
        filter((user) => !!user?.isAdmin === this.appHasRoleSuperAdmin),
        tap(() => this.viewContainer.createEmbeddedView(this.templateRef)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
