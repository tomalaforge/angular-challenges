import { Injectable, computed, signal } from '@angular/core';

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
export class CurrencyService {
  readonly code = signal('EUR');
  readonly symbol = computed(
    () => currency.find((i) => this.code() === i.code)?.symbol ?? this.code()
  );
}
