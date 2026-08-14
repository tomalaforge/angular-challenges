import { provideHttpClient, withXhr } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withXhr())],
};
