import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { User } from './user.model';
import { UserStore } from './user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  roleSent: User[] = [] as User[];
  @Input() set hasRole(role: User[]) {
    this.roleSent = role;
  }

  private template = inject(TemplateRef<unknown>);
  private vcr = inject(ViewContainerRef);
  private userStore = inject(UserStore);

  public ngOnInit(): void {
    this.userStore.user$.pipe().subscribe((p) => {
      if (p == undefined) return;
      this.vcr.clear();
      if (this.isAdmin(p)) {
        this.vcr.createEmbeddedView(this.template);
        return;
      }

      let rolesFlattened: string[] = [];
      let namesRoles: string[] = [];
      this.roleSent.forEach((p) => {
        namesRoles = [...namesRoles, p.name];
        rolesFlattened = [...rolesFlattened, ...p.roles];
      });
      if (rolesFlattened.length === 0) {
        if (namesRoles.includes('admin')) return;
        this.vcr.createEmbeddedView(this.template);
        return;
      }
      const intersectionResult = this.performIntersection(
        rolesFlattened,
        p.roles,
      );
      if (intersectionResult && intersectionResult.length > 0)
        this.vcr.createEmbeddedView(this.template);
    });
  }

  private performIntersection(arr1: string[], arr2: string[]): string[] {
    const intersectionResult = arr1.filter((x) => arr2.indexOf(x) !== -1);

    return intersectionResult;
  }

  private isAdmin(user: User): boolean {
    return user.isAdmin;
  }
}
