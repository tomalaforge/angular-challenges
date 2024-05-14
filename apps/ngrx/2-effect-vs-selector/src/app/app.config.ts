import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { ActivityEffects } from './store/activity/activity.effects';
import { activityFeature } from './store/activity/activity.reducer';
import { StatusEffects } from './store/status/status.effects';
import { statusFeature } from './store/status/status.reducer';
import { UserEffects } from './store/user/user.effects';
import { userFeature } from './store/user/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState(activityFeature),
    provideState(statusFeature),
    provideState(userFeature),
    provideEffects([ActivityEffects, UserEffects, StatusEffects]),
  ],
};
