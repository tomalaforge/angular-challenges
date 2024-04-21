import { Injectable, inject } from '@angular/core';
import { Role } from '../../user.model';
import { UserStore } from '../../user.store';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  userStore = inject(UserStore);

  checkRoleSuperAdmin() {
    return this.userStore.hasRoleSuperAdmin(true);
  }

  checkRole(roles: Role[]) {
    return this.userStore.hasRole(roles);
  }
}
