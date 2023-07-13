import { randNumber } from '@ngneat/falso';
import { Observable, throwError } from 'rxjs';

/**
 * Execute success function if value is above threshold and error function otherwise
 * Success and error function should return the same ReturnType
 * @param success
 * @param error
 * @param threashold default to 0.5
 */
export const randomError = <T>({
  success,
  error,
  threashold,
}: {
  success: () => T;
  error: () => T;
  threashold?: number;
}): T => {
  const randomNumber = randNumber({ min: 0.1, max: 1, fraction: 2 });
  if (randomNumber > (threashold ?? 0.5)) {
    return success();
  }
  return error();
};

/**
 * Execute http request if value is above threshold and throw an error otherwise
 * @param httpRequest
 * @param errorMessage
 * @param threashold default to 0.5
 */
export const randomErrorHttp = <T>({
  httpRequest,
  errorMessage,
  threashold,
}: {
  httpRequest: () => Observable<T>;
  errorMessage?: string;
  threashold?: number;
}): Observable<T> => {
  const randomNumber = randNumber({ min: 0.1, max: 1, fraction: 2 });
  if (randomNumber > (threashold ?? 0.5)) {
    return httpRequest();
  }
  return throwError(() => new Error(errorMessage ?? 'Http Error'));
};
