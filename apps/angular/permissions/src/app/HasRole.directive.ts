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
  //@Input() roleSent: User={} as User;
  roleSent: User = {} as User;
  @Input() set hasRole(role: User) {
    this.roleSent = role;
    //console.log("el rol es: ", role)
  }
  // get the template ref from the ng-template host
  private template = inject(TemplateRef<unknown>);
  // get the viewcontainerref from the host: <!--comment-->
  private vcr = inject(ViewContainerRef);
  // @Input() csdIf: boolean = false;
  private userStore = inject(UserStore);
  // ngOnChanges(): void {
  //   const user$ = this.userStore.user$;
  //   console.log(user$)
  // }

  public ngOnInit(): void {
    this.userStore.user$.pipe().subscribe((p) => {
      if (p == undefined) return;
      this.vcr.clear();
      if (p.isAdmin) this.vcr.createEmbeddedView(this.template);
      const intersectionResult = this.performIntersection(
        this.roleSent.roles,
        p.roles,
      );
      if (intersectionResult && intersectionResult.length > 0)
        this.vcr.createEmbeddedView(this.template);

      console.log('el rol activo es ', p.roles);
      console.log('el rol del div es ', this.roleSent.roles);
      console.log('la interseccion ', intersectionResult);

      // console.log("el rol activo es ", p?.name)
      // console.log("el rol del div es ", this.roleSent)
    });
  }

  private performIntersection(arr1: string[], arr2: string[]): string[] {
    const intersectionResult = arr1.filter((x) => arr2.indexOf(x) !== -1);

    return intersectionResult;
  }
}
