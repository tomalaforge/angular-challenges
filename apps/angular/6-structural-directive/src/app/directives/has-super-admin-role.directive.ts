import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasSuperAdminRole]',
  standalone: true,
})
export default class HasSuperAdminRoleDirective implements OnInit {
  private templateRef = inject(TemplateRef);
  private vcr = inject(ViewContainerRef);
  private readonly userStore = inject(UserStore);
  user$ = this.userStore.user$;
  @Input() hasRoleSuperAdmin: boolean = false;

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.isAdmin && user?.name === 'admin') {
        this.vcr.createEmbeddedView(this.templateRef);
      } else {
        this.vcr.clear();
      }
    });
  }
}
