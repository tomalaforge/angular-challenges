import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { errorHandleInterceptor } from './interceptors/error-handle.interceptor';
import { AppEffects } from './states/commons/app.effects';
import { TodoEffects } from './states/todos/todo.effects';
import { todoFeatureKey, todoReducer } from './states/todos/todo.reducer';
import { loaderInterceptor } from './ui/loader/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideHttpClient(
      withInterceptors([errorHandleInterceptor, loaderInterceptor]),
    ),
    provideStore(),
    provideEffects(TodoEffects, AppEffects),
    provideState(todoFeatureKey, todoReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
