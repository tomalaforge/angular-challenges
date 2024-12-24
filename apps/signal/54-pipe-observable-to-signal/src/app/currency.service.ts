import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface Currency {
  name: string;
  code: string;
  symbol: string;
}

export const currency: Currency[] = [
  { name: 'Euro', code: 'EUR', symbol: '€' },
  { name: 'Dollar US', code: 'USD', symbol: 'US$' },
  { name: 'Dollar Australian', code: 'AUD', symbol: 'AU$' },
  { name: 'Pound Sterling', code: 'GBP', symbol: '£' },
  { name: 'Dollar Canadian', code: 'CAD', symbol: 'CAD' },
];

@Injectable()
export class CurrencyService {
  private code = new BehaviorSubject('EUR');

  readonly code$ = this.code.asObservable();
  readonly symbol$ = this.code$.pipe(
    map((code) => currency.find((c) => c.code === code)?.symbol ?? code),
  );

  public updateCode(code: string) {
    this.code.next(code);
  }
}
