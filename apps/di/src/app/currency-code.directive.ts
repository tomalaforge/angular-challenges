import { Directive, ElementRef, Input } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

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

@Directive({
  selector: '[code]',
  standalone: true,
})
export class CurrencyCodeDirective extends ComponentStore<{ code: string }> {
  // problem if code is not defined in the template ie [code]=""
  // if one of the currency codes is missing in the currency object, you get undefined in the template

  readonly code$ = this.select((state) => state.code);

  constructor(private el: ElementRef) {
    super({ code: 'EUR' });
  }

  @Input() set code(code: string) {
    this.patchState({ code });
  }

  ngOnInit() {
    this.code$.subscribe((symbol) => {
      const ans = currency.find((c) => c.code === symbol);

      this.el.nativeElement.insertAdjacentHTML('beforeend', `${ans?.symbol}`);
    });
  }
}
