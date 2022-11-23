import { APP_INITIALIZER, enableProdMode, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PushService } from '../../../libs/ngrx-notification/backend/src/lib/push.service';
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
        inject(PushService).init();
        return () => of(true);
      },
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        inject(NotificationService).init();
        return () => of(true);
      },
    },
  ],
}).catch((err) => console.error(err));
