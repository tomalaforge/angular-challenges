import { createReducer, on } from '@ngrx/store';
import { ActivityType, Person } from '../activity/activity.model';
import * as StatusActions from './status.actions';
import { Status } from './status.model';

export const statusFeatureKey = 'status';

export interface StatusState {
  statuses: Status[];
  teachersMap: Map<ActivityType, Person[]>;
}

export const initialState: StatusState = {
  statuses: [],
  teachersMap: new Map(),
};

export const statusReducer = createReducer(
  initialState,
  on(StatusActions.loadStatusesSuccess, (state, { statuses }): StatusState => {
    const map = new Map();
    statuses.forEach((s) => map.set(s.name, s.teachers));
    return {
      ...state,
      statuses,
      teachersMap: map,
    };
  }),
);
