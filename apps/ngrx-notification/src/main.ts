import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

import {
  studentReducer,
  studentsFeatureKey,
} from './app/student/store/student.reducer';

import {
  teacherReducer,
  teachersFeatureKey,
} from './app/teacher/store/teacher.reducer';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const REDUCERS = {
  [teachersFeatureKey]: teacherReducer,
  [studentsFeatureKey]: studentReducer,
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
