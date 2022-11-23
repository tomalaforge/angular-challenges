import { PushService } from '@angular-challenges/ngrx-notification/backend';
import { Push } from '@angular-challenges/ngrx-notification/model';
import { inject, InjectionToken } from '@angular/core';
import { filter, Observable, share } from 'rxjs';

export const PUSH_ACTION = new InjectionToken<Observable<Push>>(
  'Push messaging action stream',
  {
    factory: () =>
      inject(PushService).notification$.pipe(filter(Boolean), share()),
  }
);
