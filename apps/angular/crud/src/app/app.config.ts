import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
   { provide: ErrorHandler, useClass: ErrorHandler },
  ],
};
