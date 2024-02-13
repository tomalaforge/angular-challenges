import { ClassProvider, inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

function describeDestroyService() {
  @Injectable()
  class DestroyService extends Subject<void> implements OnDestroy {
    ngOnDestroy(): void {
      this.next();
      this.complete();
    }
  }

  function provideDestroyService(): ClassProvider {
    return {
      provide: DestroyService,
      useClass: DestroyService,
    };
  }

  function injectDestroyService(): Observable<void> {
    const destroy$ = inject(DestroyService, { self: true, optional: true });

    if (!destroy$) {
      throw new Error(
        'It seems that you forgot to provide DestroyService. Add "provideDestroyService()" to your declarable\'s providers.',
      );
    }

    return destroy$.asObservable();
  }

  return {
    provideDestroyService,
    injectDestroyService,
  };
}

export const { provideDestroyService, injectDestroyService } =
  describeDestroyService();
