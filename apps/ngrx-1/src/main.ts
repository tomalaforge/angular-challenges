import { appConfig } from './app/app.config';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

import {
  activityFeatureKey,
  activityReducer,
} from './app/store/activity/activity.reducer';

import {
  statusFeatureKey,
  statusReducer,
} from './app/store/status/status.reducer';

import { userFeatureKey, userReducer } from './app/store/user/user.reducer';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const reducers = {
  [statusFeatureKey]: statusReducer,
  [activityFeatureKey]: activityReducer,
  [userFeatureKey]: userReducer,
};

bootstrapApplication(AppComponent, appConfig);
