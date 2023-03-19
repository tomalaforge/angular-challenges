import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { bookGuard } from './book.guard';

export const appRoutes: Route[] = [
  {
    path: 'search',
    loadComponent: () => import('./search.component'),
  },
  {
    path: 'shelf',
    canActivate: [(route: ActivatedRouteSnapshot) => bookGuard(route)],
    loadComponent: () => import('./shelf.component'),
  },
  {
    path: 'no-result',
    loadComponent: () => import('./no-book-search.component'),
  },
];
