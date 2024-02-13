import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityType } from '../activity/activity.model';
import { StatusState, statusFeatureKey } from './status.reducer';

export const selectStatusState =
  createFeatureSelector<StatusState>(statusFeatureKey);

export const selectStatuses = createSelector(
  selectStatusState,
  (state) => state.statuses,
);

export const selectAllTeachersByActivityType = (name: ActivityType) =>
  createSelector(
    selectStatusState,
    (state) => state.teachersMap.get(name) ?? [],
  );
