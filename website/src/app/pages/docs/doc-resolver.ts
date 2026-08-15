import { ResolveFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Doc } from '../../doc.model';
import { CONTENT_MAP } from '../../generated/content-map';

export const docResolver: ResolveFn<Doc | RedirectCommand> = async (route) => {
  let segments = route.url.map((s) => s.path);
  // Solution routes resolve the underlying challenge doc.
  const solutionsIndex = segments.indexOf('solutions');
  if (solutionsIndex !== -1) {
    segments = segments.slice(0, solutionsIndex);
  }
  const url = '/' + segments.join('/');
  const load = CONTENT_MAP[url.replace(/\/$/, '')];
  if (!load) {
    const router = inject(Router);
    return new RedirectCommand(router.parseUrl('/not-found'), { skipLocationChange: true });
  }
  return load();
};
