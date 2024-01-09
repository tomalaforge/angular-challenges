import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs';

export function errorHandlerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response && !event.ok) {
        console.log('error handler...');
      }
    }),
  );
}
