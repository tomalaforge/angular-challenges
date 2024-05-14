import { PushService } from '@angular-challenges/power-of-effect/backend';
import { Push } from '@angular-challenges/power-of-effect/model';
import { inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const PUSH_TOKEN = new InjectionToken<Observable<Push | undefined>>(
  'PUSH_TOKEN',
  {
    factory: () => inject(PushService).notification$,
  },
);
