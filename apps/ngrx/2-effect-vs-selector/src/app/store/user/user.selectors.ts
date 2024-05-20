import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userFeatureKey } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user,
);
