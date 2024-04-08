import { InjectionToken, WritableSignal, signal } from '@angular/core';

// @Injectable({providedIn: 'root'})
// export class LoadingService {
//     loading = signal(false)
// }

export const LOADING = new InjectionToken<WritableSignal<boolean>>(
  'Global Loading Signal',
);

export function provideGlobalLoading() {
  return {
    provide: LOADING,
    useValue: signal(false),
  };
}
