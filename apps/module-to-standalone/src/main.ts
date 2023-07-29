import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import appRoutes from 'libs/module-to-standalone/shell/src/lib/main-shell.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), provideToken('main-shell-token')],
}).catch((err) => console.error(err));
