import { ExtraOptions, Route } from '@angular/router';
import { FooComponent } from './foo.component';
import { HomeComponent } from './home.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'foo', component: FooComponent },
  { path: '**', redirectTo: 'home' },
];
