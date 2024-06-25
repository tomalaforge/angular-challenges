import { Injectable, computed, signal } from '@angular/core';

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
  #code = signal('EUR');

  symbol = computed(
    () => currency.find((c) => c.code === this.#code())?.symbol ?? this.#code(),
  );

  public updateCode(code: string) {
    this.#code.set(code);
  }
}
