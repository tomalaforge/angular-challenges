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
  //The reducer is the element that is meant to tranform the state and keep the current one.
  //If there should be no reducer that means that instead of making a whole store for statuses
  //should this information be derived at component level??
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
