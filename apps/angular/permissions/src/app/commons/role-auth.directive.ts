import {
  Directive,
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
export class RoleAuthDirective implements OnInit {
  private userRoles!: Role[];

  @Input()
  set hasRole(roles: Role[]) {
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }

    this.userRoles = roles;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userStore: UserStore,
  ) {}

  ngOnInit() {
    this.userStore.user$
      .subscribe({
        next: (user) => {
          if (
            this.userRoles.some(
              (r) => user?.roles.findIndex((e) => e === r) !== -1,
            )
          ) {
            //then has access
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            // no access
            this.viewContainer.clear();
          }
        },
      })
      .unsubscribe();
  }
}
