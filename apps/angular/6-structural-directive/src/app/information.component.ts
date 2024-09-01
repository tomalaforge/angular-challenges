import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { UserStore } from './user.store';
import { UserService } from './user.service';
import { HasRoleDirective, HasRoleSuperAdminDirective } from './role.directives';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <!-- <div>visible only for super admin</div>
    <div>visible if manager</div>
    <div>visible if manager and/or reader</div>
    <div>visible if manager and/or writer</div>
    <div>visible if client</div>
    <div>visible for everyone</div> -->
    <div *hasRole="['MANAGER']">Visible only for manager</div>
    <div *hasRole="['MANAGER', 'READER']">Visible if manager and/or reader</div>
    <div *hasRole="['MANAGER', 'WRITER']">Visible if manager and/or writer</div>
    <div *hasRole="['CLIENT']">Visible if client</div>
    <div *hasRoleSuperAdmin="true">Visible only for super admin</div>
    <div>Visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  // user$ = this.userStore.user$;
  // constructor(private userStore: UserStore) {}
}
