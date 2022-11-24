import { FakeBackendService } from '@angular-challenges/ngrx-notification/backend';
import { APP_INITIALIZER, enableProdMode, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { NotificationService } from './app/data-access/notification.service';
import { ROUTES } from './app/routes';
import { StudentEffects } from './app/student/store/student.effects';
import {
  studentReducer,
  studentsFeatureKey,
} from './app/student/store/student.reducer';
import { TeacherEffects } from './app/teacher/store/teacher.effects';
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

bootstrapApplication(AppComponent, {
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
}).catch((err) => console.error(err));
