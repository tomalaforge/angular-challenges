import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './state/reducers/todo.reducers';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './state/effects/todo.effects';

const reducers = {
  todo: todoReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    provideStore(reducers),
    // provideState({ name: 'todo', reducer: todoReducer }),
    provideEffects(TodoEffects),
  ],
};
