import { DestroyRef, inject, ProviderToken } from '@angular/core';
import { Observable } from 'rxjs';

export function injectAutoSignal<
  T,
  Service extends { connection$: Observable<T> }
>(token: ProviderToken<Service>) {
  const service = inject(token);
  const sub = service.connection$.subscribe();
  inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  return service;
}
