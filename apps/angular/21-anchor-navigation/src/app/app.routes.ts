import { Route } from '@angular/router';
import { FooComponent } from './foo.component';
import { HomeComponent } from './home.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'foo', component: FooComponent, title: 'Foo page' },
  { path: '**', redirectTo: 'home' },
];
