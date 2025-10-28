import { inject } from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

export const hasRoleGuard = (role: Role[]) => {
  const userStore = inject(UserStore);
  return userStore.hasAnyRole(role)();
};
