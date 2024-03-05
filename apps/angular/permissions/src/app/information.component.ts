import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasRoleDirective } from './HasRole.directive';
import { admin, manager } from './user.model';
import { UserStore } from './user.store';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, HasRoleDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *hasRole="adminRole">visible only for super admin</div>
    <div *hasRole="managerRole">visible if manager</div>
    <!-- <div>visible if manager and/or reader</div>
    <div>visible if manager and/or writer</div>
    <div *hasRole="'client'">visible if client</div>
    <div *hasRole="'everyone'">visible for everyone</div> -->
    -->
    <!-- <div *hasRole="'manager'" >informacion del manager</div> -->
    <!-- <div>{{(this.user$|async)?.name}}</div> -->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  adminRole = admin;
  managerRole = manager;
  user$ = this.userStore.user$;
  constructor(private userStore: UserStore) {}
}
