import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  override handleError(error: string) {
    // Custom error handling logic
    console.log(error);
  }
}
