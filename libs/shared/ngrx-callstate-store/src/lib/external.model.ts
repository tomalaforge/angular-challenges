/* eslint-disable @typescript-eslint/no-empty-interface */
import { ClassProvider, InjectionToken, Type } from '@angular/core';
import { CallStateErrorHandler } from './call-state.model';

export interface ErrorHandler<T extends CustomError> {
  toError: (error: unknown) => T;
  getErrorMessage: (error?: T) => string | undefined;
}

export interface CustomError {}

export const ERROR_TOKEN = new InjectionToken<ErrorHandler<any>>('error', {
  factory: () => new CallStateErrorHandler(),
});

export const provideErrorHandler = <T extends ErrorHandler<any>>(
  errorHandlerClass: Type<T>
): ClassProvider => ({ provide: ERROR_TOKEN, useClass: errorHandlerClass });
