import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { provideRouter } from '@angular/router';
import { appRoutes } from '@angular-challenges/module-to-standalone/shell';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), provideToken('main-shell-token')],
}).catch((err) => console.error(err));
