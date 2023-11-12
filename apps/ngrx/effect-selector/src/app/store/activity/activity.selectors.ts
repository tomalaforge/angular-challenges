import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectUser } from '../user/user.selectors';
import { ActivityType } from './activity.model';
import { ActivityState, activityFeatureKey } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities
);

export const selectAllTeachersByActivityType = (activityType: ActivityType) =>
  createSelector(selectActivities, selectUser, (activities, user) =>
    user?.isAdmin
      ? activities
          .filter((activity) => activity.type === activityType)
          .map((activity) => activity.teacher)
      : []
  );
