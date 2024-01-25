import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  input,
} from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class RoleAuthDirective implements OnInit {
  hasRole = input.required<Role[]>();

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
            this.hasRole().some(
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
