import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject } from '@angular/core';
import { App5StateService } from '../services/state/app-state.service';

/**
 * Global error handler class implementing Angular's ErrorHandler interface.
 * It captures and processes all unhandled errors across the application.
 */
export class GlobalErrorHandler implements ErrorHandler {
  #stateService = inject(App5StateService); // Injects the application state service for error management.

  /**
   * Handles errors of any type caught by Angular's error handling mechanism.
   * If the error is an instance of HttpErrorResponse, it updates the application state with the error message.
   * @param error The error object caught by the error handler.
   */
  handleError<T>(error: T): void {
    console.trace('An error occurred caught by GlobalErrorHandler:', error);

    if (error instanceof HttpErrorResponse) {
      // If the error is an HTTP response error, set the application state to error with the message.
      this.#stateService.setError(error.message, null);
    }
    // Log the current error message for debugging purposes.
    console.log(this.#stateService.error);
  }
}
