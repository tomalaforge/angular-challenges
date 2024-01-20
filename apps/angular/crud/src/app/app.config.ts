import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ErrorHandlerInterceptor } from './interceptors/error-handle.interceptor';
import { AppEffects } from './store/commons/app.effects';
import { TasksEffects } from './store/tasks/task.effects';
import { TasksReducer } from './store/tasks/task.reducer';
import { LoaderInterceptor } from './ui/loader/loader.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideHttpClient(
      withInterceptors([LoaderInterceptor, ErrorHandlerInterceptor]),
    ),
    provideStore({ taskReducer: TasksReducer }),
    provideEffects(TasksEffects, AppEffects),
  ],
};
