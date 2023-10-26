import { ErrorHandler, Injectable, inject } from '@angular/core';
import { LoadingService } from '../data-access/loading.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  loadingService = inject(LoadingService);

  handleError(error: any): void {
    console.error('The following error was found:', error);
    window.alert('There was an error: ' + error);
    window.location.reload();
    this.loadingService.stopLoading();
  }
}
