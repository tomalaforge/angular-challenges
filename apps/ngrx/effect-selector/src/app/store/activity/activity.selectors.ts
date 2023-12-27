import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectUserState } from '../user/user.selectors';
import { ActivityType } from './activity.model';
import { ActivityState, activityFeatureKey } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities,
);

export const selectAllTeachersByActivityType = (type: ActivityType) =>
  createSelector(
    selectActivityState,
    selectUserState,
    (activityState, userState) => {
      if (userState.user?.isAdmin) {
        return activityState.activities
          .filter((a) => a.type === type)
          .map((a) => {
            return {
              id: a.id,
              name: a.teacher.name,
            };
          });
      }
      return [];
    },
  );
