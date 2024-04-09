import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasRoleDirective, HasRoleSuperAdminDirective } from './role.directive';
import { Role } from './user.model';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [HasRoleDirective, HasRoleSuperAdminDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *appHasRoleSuperAdmin>visible only for super admin</div>
    <div *appHasRole="[Role.MANAGER]">visible if manager</div>
    <div *appHasRole="[Role.MANAGER, Role.READER]">
      visible if manager and/or reader
    </div>
    <div *appHasRole="[Role.MANAGER, Role.WRITER]">
      visible if manager and/or writer
    </div>
    <div *appHasRole="[Role.CLIENT]">visible if client</div>
    <div>visible for everyone</div>
    <div *appHasRoleSuperAdmin="false">
      visible for everyone but not the super admin
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  readonly Role = Role;
}
