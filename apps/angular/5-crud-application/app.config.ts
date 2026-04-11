import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideApiConfig } from './api.config';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideApiConfig()],
};
