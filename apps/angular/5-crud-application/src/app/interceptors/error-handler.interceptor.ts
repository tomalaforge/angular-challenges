import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('Error:', error);
      throw new Error(error);
    }),
  );
};
