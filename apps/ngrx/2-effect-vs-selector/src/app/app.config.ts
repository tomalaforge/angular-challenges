import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ActivityEffects } from './store/activity/activity.effects';
import {
  activityFeatureKey,
  activityReducer,
} from './store/activity/activity.reducer';
import { StatusEffects } from './store/status/status.effects';
import { UserEffects } from './store/user/user.effects';

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
