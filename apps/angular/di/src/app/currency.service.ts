import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs';

export interface Currency {
  name: string;
  code: string;
  symbol: string;
}

export const currency: Currency[] = [
  { name: 'Euro', code: 'EUR', symbol: '€' },
  { name: 'Dollar US', code: 'USD', symbol: 'US$' },
  { name: 'Dollar Autralien', code: 'AUD', symbol: 'AU$' },
  { name: 'Livre Sterling', code: 'GBP', symbol: '£' },
  { name: 'Dollar Canadien', code: 'CAD', symbol: 'CAD' },
];

@Injectable()
export class CurrencyService extends ComponentStore<{ code: string }> {
  readonly code$ = this.select((state) => state.code);
  readonly symbol$ = this.code$.pipe(
    map((code) => currency.find((c) => c.code === code)?.symbol ?? code),
  );

  constructor() {
    super({ code: 'EUR' });
  }
}
