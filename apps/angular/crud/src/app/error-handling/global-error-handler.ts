import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('The following error was found:', error);
    window.alert("There was an error: "+ (error))

  }
}
