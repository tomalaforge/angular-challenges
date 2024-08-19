/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserStore } from "./user.store";
import { Role } from "./user.model";
// import { takeUntil } from "rxjs/operators";

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
class HasRoleDirective implements OnInit {

  @Input('hasRole') role: Role | Role[] | undefined = undefined;

  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private store = inject(UserStore);

  ngOnInit(): void {
    this.store.hasRole(this.role).subscribe((hasPermission: boolean)=>{
      console.log('directive: ', hasPermission)
      hasPermission? this.addTemplate() : this.clearTemplate()
    })

  }
  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate() {
    this.viewContainer.clear();
  }
}

export {HasRoleDirective };
