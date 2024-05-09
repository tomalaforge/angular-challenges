import {
  injectDestroyService,
  provideDestroyService,
} from '@angular-challenges/shared/utils';
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, takeUntil } from 'rxjs';
import { Role } from '../app/user.model';
import { UserStore } from '../app/user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
  providers: [provideDestroyService()],
})
export class HasRoleDirective implements OnInit {
  private destroy$ = injectDestroyService();

  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  private store = inject(UserStore);

  private show = new BehaviorSubject<Observable<boolean | undefined>>(
    of(undefined),
  );

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    if (role) {
      this.show.next(this.store.hasAnyRole(role));
    }
  }

  @Input('hasRoleIsAdmin') set isAdmin(isAdmin: boolean) {
    if (isAdmin) {
      this.show.next(this.store.isAdmin$);
    }
  }

  ngOnInit(): void {
    this.show
      .pipe(
        switchMap((s) => {
          console.log(s);
          return s;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((showTemplate) => {
        showTemplate ? this.addTemplate() : this.clearTemplate();
      });
  }

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate() {
    this.viewContainer.clear();
  }
}
