import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { ActivityEffects } from './app/store/activity/activity.effects';
import {
  activityFeatureKey,
  activityReducer,
} from './app/store/activity/activity.reducer';
import { UserEffects } from './app/store/user/user.effects';
import { userFeatureKey, userReducer } from './app/store/user/user.reducer';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const reducers = {
  [activityFeatureKey]: activityReducer,
  [userFeatureKey]: userReducer,
};

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(reducers),
    provideEffects([ActivityEffects, UserEffects]),
  ],
});
