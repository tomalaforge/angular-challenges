import { computed, Injectable, signal } from '@angular/core';

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
  private code = signal<string>('EUR');

  readonly symbol = computed(() => {
    const currentCode = this.code();
    return currency.find((c) => c.code === currentCode)?.symbol ?? currentCode;
  });

  updateCode(newCode: string) {
    this.code.set(newCode);
  }
}
