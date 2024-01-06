import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ActivityEffects } from './store/activity/activity.effects';
import {
  activityFeatureKey,
  activityReducer,
} from './store/activity/activity.reducer';
import { UserEffects } from './store/user/user.effects';
import { userFeatureKey, userReducer } from './store/user/user.reducer';

const reducers = {
  [activityFeatureKey]: activityReducer,
  [userFeatureKey]: userReducer,
};

// provideStore -> no global state?
// just add the features
// https://timdeschryver.dev/blog/you-should-take-advantage-of-the-improved-ngrx-apis#registering-the-store

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(reducers),
    provideEffects([ActivityEffects, UserEffects]),
  ],
};
