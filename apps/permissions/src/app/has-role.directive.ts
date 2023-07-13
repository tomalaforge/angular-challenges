/* eslint-disable @angular-eslint/directive-selector */
import { NgIfContext } from '@angular/common';
import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
  providers: [provideDestroyService()],
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input('hasRole') role: Role | Role[] | undefined = undefined;

  @Input('hasRoleIsAdmin') isAdmin = false;

  @Input('hasRoleIsAdminElseTemplate')
  elseTemplate?: TemplateRef<NgIfContext> | null;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private store: UserStore
  ) {}

  ngOnDestroy(): void {
    console.log('on destroy');
  }

  ngOnInit(): void {
    console.log(this.role, this.isAdmin, this.elseTemplate);
    if (this.isAdmin) {
      this.store.isAdmin$.subscribe((isAdmin) => {
        console.log(isAdmin);
        isAdmin ? this.addTemplate() : this.addElseTemplate();
      });
    }
    // else if (this.role) {
    //   this.store
    //     .hasAnyRole(this.role)
    //     .subscribe((hasPermission) =>
    //       hasPermission ? this.addTemplate() : this.addElseTemplate()
    //     );
    // } else {
    //   this.addTemplate();
    // }
  }

  private addTemplate() {
    console.log('Add');
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private addElseTemplate() {
    console.log('ici');
    this.viewContainer.clear();
    this.elseTemplate &&
      this.viewContainer.createEmbeddedView(this.elseTemplate);
  }
}
