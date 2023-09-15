import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './infrastructure/global-error-handler';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
