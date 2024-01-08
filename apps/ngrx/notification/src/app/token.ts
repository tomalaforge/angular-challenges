import { PushService } from '@angular-challenges/ngrx-notification/backend';
import { Push } from '@angular-challenges/ngrx-notification/model';
import { InjectionToken, inject } from '@angular/core';
import { Observable } from 'rxjs';

export type TokenType = Observable<Push | undefined>;
export const TOKEN = new InjectionToken<TokenType>('PUSH', {
  factory() {
    return inject(PushService).notification$;
  },
});
