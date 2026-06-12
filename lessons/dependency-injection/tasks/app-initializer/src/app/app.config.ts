import { ApplicationConfig } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config.service';


export const appConfig: ApplicationConfig = {
  providers: [
    // TODO: добавь APP_INITIALIZER чтобы ConfigService.load() вызвался до старта приложения
  ],
};
