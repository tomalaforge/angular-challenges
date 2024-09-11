import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userFeatureKey } from './user.reducer';

const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

const selectUser = createSelector(selectUserState, (state) => state.user);

const isUserAdmin = createSelector(selectUser, (user) => user?.isAdmin);

export const UserSelectors = {
  selectUser,
  isUserAdmin,
};
