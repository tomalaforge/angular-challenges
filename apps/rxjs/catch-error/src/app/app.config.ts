import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule)],
};
