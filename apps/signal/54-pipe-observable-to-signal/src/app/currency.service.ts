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
  private readonly codeSignal = signal('EUR');

  readonly symbol = computed(
    () =>
      currency.find((c) => c.code === this.codeSignal())?.symbol ??
      this.codeSignal(),
  );

  updateCode(code: string) {
    this.codeSignal.set(code);
  }
}
