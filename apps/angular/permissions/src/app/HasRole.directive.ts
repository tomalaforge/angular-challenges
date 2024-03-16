import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { InfoHasRole, User } from './user.model';
import { UserStore } from './user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnChanges {
  // roleSent: User[] = [] as User[];
  // @Input() set hasRole(role: User[]) {
  //   this.roleSent = role;
  // }

  userLogged: User | undefined = {} as User;
  roleSent: User[] = [] as User[];
  @Input() set hasRole(dataFromInformation: InfoHasRole) {
    this.roleSent = dataFromInformation.rolesInformation;
    this.userLogged = dataFromInformation.UserLogged;
  }

  private template = inject(TemplateRef<unknown>);
  private vcr = inject(ViewContainerRef);
  private userStore = inject(UserStore);

  public ngOnChanges(): void {
    if (!this.userLogged?.name) return;
    console.log(
      'El usuario logeado es: ',
      this.userLogged,
      ' y los roles de la capa son: ',
      this.roleSent,
    );
    // this.userStore.user$.pipe().subscribe((p) => {
    if (this.userLogged == undefined) return;
    this.vcr.clear();
    if (this.userLogged.isAdmin) {
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
      this.userLogged.roles,
    );
    if (intersectionResult && intersectionResult.length > 0)
      this.vcr.createEmbeddedView(this.template);
    // });
  }

  private performIntersection(arr1: string[], arr2: string[]): string[] {
    const intersectionResult = arr1.filter((x) => arr2.indexOf(x) !== -1);
    return intersectionResult;
  }
}
