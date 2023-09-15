import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    console.log(error);

    if (error instanceof Error)
      alert(`somthing went wrong.
    
        ${JSON.stringify(error.message)}
        `);
  }
}
