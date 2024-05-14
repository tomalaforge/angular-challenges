import { FakeBackendService } from '@angular-challenges/power-of-effect/backend';
import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { NotificationService } from './data-access/notification.service';
import { ROUTES } from './routes';
import { StudentEffects } from './student/store/student.effects';
import { studentFeature } from './student/store/student.reducer';
import { TeacherEffects } from './teacher/store/teacher.effects';
import { teacherFeature } from './teacher/store/teacher.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState(studentFeature),
    provideState(teacherFeature),
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
    provideAnimations(),
  ],
};
