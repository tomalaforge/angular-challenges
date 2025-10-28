import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { UserStore } from './user.store';

export const isAdminGuard: CanMatchFn = () => {
  const userStore = inject(UserStore);
  return userStore.isAdmin();
};
