import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

export function handleError(err: HttpErrorResponse): Observable<never> {
  const errorMsg =
    err.error instanceof ErrorEvent
      ? `Client-side error: ${err.error.message}`
      : `Server-side error (${err.status}): ${err.message}`;

  console.warn(errorMsg);
  return throwError(() => new Error(errorMsg));
}
