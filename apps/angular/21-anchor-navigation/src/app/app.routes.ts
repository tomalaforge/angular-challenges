import { ExtraOptions, Route } from '@angular/router';
import { FooComponent } from './foo.component';
import { HomeComponent } from './home.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'foo', component: FooComponent },
  { path: '**', redirectTo: 'home' },
];

export const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};
