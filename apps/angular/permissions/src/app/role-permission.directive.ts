import { NgIf } from '@angular/common';
import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  selector: '[hasRole]',
  hostDirectives: [
    {
      directive: NgIf,
      inputs: ['ngIf:hasRole'],
    },
  ],
  standalone: true,
})
export class RolePermissionDirective implements OnInit, OnDestroy {
  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private userStore: UserStore,
  ) {}

  @Input() hasRole: Role[] = [];
  @Input() hasRoleAdmin: boolean = false;

  destroy$ = new Subject<void>();

  ngOnInit() {
    this.userStore.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (!user) return;

      let shouldDisplay: boolean;
      if (this.hasRoleAdmin) {
        shouldDisplay = user.isAdmin;
      } else {
        shouldDisplay =
          !this.hasRole.length ||
          user.roles.some((role) => this.hasRole.includes(role));
      }

      this.vcr.clear();
      if (shouldDisplay) {
        this.vcr.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
