import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(MatDialogModule)],
};
