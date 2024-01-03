import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { AppRoutes } from '@angular-challenges/module-to-standalone/shell';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(AppRoutes), provideToken('main-shell-token')],
}).catch((e) => console.error(e));
