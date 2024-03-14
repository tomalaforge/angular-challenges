import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { HasRoleDirective } from './HasRole.directive';
import {
  InfoHasRole,
  User,
  admin,
  client,
  everyone,
  manager,
  writer,
} from './user.model';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, HasRoleDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->

    <div *hasRole="infoAdmin">visible only for super admin</div>
    <div *hasRole="infoManager">visible if manager</div>
    <!--
    <div *hasRole="infoManagerReader">visible if manager and/or reader</div>
    <div *hasRole="infoManagerWriter">visible if manager and/or writer</div>
    <div *hasRole="infoClient">visible if client</div>
    <div *hasRole="infoEveryone">visible for everyone</div> -->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent implements OnChanges {
  @Input() userRole: User | undefined = {} as User;

  infoAdmin: InfoHasRole = {} as InfoHasRole;
  infoManagerReader: InfoHasRole = {} as InfoHasRole;
  infoManager: InfoHasRole = {} as InfoHasRole;
  infoManagerWriter: InfoHasRole = {} as InfoHasRole;
  infoClient: InfoHasRole = {} as InfoHasRole;
  infoEveryone: InfoHasRole = {} as InfoHasRole;

  constructor() {}
  ngOnChanges(): void {
    console.log(
      'el rol que me viene como parametro input es : ',
      this.userRole,
    );
    this.infoAdmin = { UserLogged: this.userRole, rolesInformation: [admin] };
    this.infoManagerReader = {
      UserLogged: this.userRole,
      rolesInformation: [admin, manager],
    };
    this.infoManager = {
      UserLogged: this.userRole,
      rolesInformation: [manager],
    };
    this.infoManagerWriter = {
      UserLogged: this.userRole,
      rolesInformation: [manager, writer],
    };
    this.infoClient = { UserLogged: this.userRole, rolesInformation: [client] };
    this.infoEveryone = {
      UserLogged: this.userRole,
      rolesInformation: [everyone],
    };
  }
}
