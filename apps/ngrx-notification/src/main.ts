import { PushService } from '@angular-challenges/ngrx-notification/backend';
import { APP_INITIALIZER, enableProdMode, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NotificationService } from './app/data-access/notification.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(PushService);
        return () => service.init();
      },
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(NotificationService);
        return () => service.init();
      },
    },
  ],
}).catch((err) => console.error(err));
