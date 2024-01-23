import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRoleSuperAdmin]',
  standalone: true,
})
export class AdminAuthDirective implements OnInit {
  @Input()
  hasRoleSuperAdmin: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userStore: UserStore,
  ) {}

  ngOnInit() {
    this.userStore.user$.subscribe({
      next: (user) =>
        user?.isAdmin
          ? this.viewContainer.createEmbeddedView(this.templateRef)
          : this.viewContainer.clear(),
    });
  }
}
