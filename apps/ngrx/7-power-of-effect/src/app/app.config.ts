import { FakeBackendService } from '@angular-challenges/power-of-effect/backend';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
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
    provideAppInitializer(() => {
      const initializerFn = (() => {
        const service = inject(FakeBackendService);
        return () => service.start();
      })();
      return initializerFn();
    }),
    provideAppInitializer(() => {
      const initializerFn = (() => {
        const service = inject(NotificationService);
        return () => service.init();
      })();
      return initializerFn();
    }),
    provideAnimations(),
  ],
};
