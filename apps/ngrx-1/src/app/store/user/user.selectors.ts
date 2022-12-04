import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey, UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const isUserAdmin = createSelector(
  selectUserState,
  (state) => state.user?.isAdmin
);
