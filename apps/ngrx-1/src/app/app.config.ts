import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ActivityEffects } from './store/activity/activity.effects';
import { UserEffects } from './store/user/user.effects';
import { StatusEffects } from './store/status/status.effects';
import {
  activityFeatureKey,
  activityReducer,
} from './store/activity/activity.reducer';

import { statusFeatureKey, statusReducer } from './store/status/status.reducer';

import { userFeatureKey, userReducer } from './store/user/user.reducer';

const reducers = {
  [statusFeatureKey]: statusReducer,
  [activityFeatureKey]: activityReducer,
  [userFeatureKey]: userReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(reducers),
    provideEffects([ActivityEffects, UserEffects, StatusEffects]),
  ],
};
