import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from './loading.service';

const activeRequests = {
  count: 0,
  increment(): void {
    this.count++;
  },
  decrement(): void {
    this.count--;
  },
  isEmpty(): boolean {
    return this.count === 0;
  },
};

export const LoadingInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingService = inject(LoadingService);

  if (activeRequests.isEmpty()) {
    loadingService.show();
  }

  activeRequests.increment();

  return next(request).pipe(
    finalize(() => {
      activeRequests.decrement();
      if (activeRequests.isEmpty()) {
        loadingService.hide();
      }
    }),
  );
};
