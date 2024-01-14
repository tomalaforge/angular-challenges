import { FakeBackendService } from '@angular-challenges/ngrx-notification/backend';
import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { NotificationService } from './data-access/notification.service';
import { ROUTES } from './routes';
import { StudentEffects } from './student/store/student.effects';
import {
  studentReducer,
  studentsFeatureKey,
} from './student/store/student.reducer';
import { TeacherEffects } from './teacher/store/teacher.effects';
import {
  teacherReducer,
  teachersFeatureKey,
} from './teacher/store/teacher.reducer';

const REDUCERS = {
  [teachersFeatureKey]: teacherReducer,
  [studentsFeatureKey]: studentReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(REDUCERS),
    provideEffects([TeacherEffects, StudentEffects]),
    provideRouter(ROUTES),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(FakeBackendService);
        return () => service.start();
      },
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(NotificationService);
        return () => service.init();
      },
    },
  ],
};
