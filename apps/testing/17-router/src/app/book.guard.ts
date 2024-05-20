import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { availableBooks } from './book.model';

export const bookGuard = (
  route: ActivatedRouteSnapshot,
  router = inject(Router),
) => {
  const searchParam = route.queryParams?.['book'].toLowerCase();

  const isBookAvailable =
    !!searchParam &&
    availableBooks.some(
      (b) =>
        b.author.toLowerCase().includes(searchParam) ||
        b.name.toLowerCase().includes(searchParam),
    );

  return isBookAvailable || router.parseUrl('no-result');
};
