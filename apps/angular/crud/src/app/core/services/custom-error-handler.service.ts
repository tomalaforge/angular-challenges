import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  toastService = inject(ToastService);

  handleError(error: unknown): void {
    if (error instanceof Error) {
      this.toastService.show(error.message);
    }
  }
}
