import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ActivityEffects } from './store/activity/activity.effects';
import {
  ActivityState,
  activityFeatureKey,
  activityReducer,
} from './store/activity/activity.reducer';
import { UserEffects } from './store/user/user.effects';

import {
  UserState,
  userFeatureKey,
  userReducer,
} from './store/user/user.reducer';

export interface AppStore {
  [activityFeatureKey]: ActivityState;
  [userFeatureKey]: UserState;
}

const reducers = {
  [activityFeatureKey]: activityReducer,
  [userFeatureKey]: userReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(reducers),
    provideEffects([ActivityEffects, UserEffects]),
  ],
};
