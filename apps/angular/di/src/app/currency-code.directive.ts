import { Directive, inject, Input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: 'tr[currency-code]',
  standalone: true,
  providers: [CurrencyService],
})
export class CurrencyCodeDirective {
  currencyService = inject(CurrencyService);

  @Input('currency-code') set currencyCode(code: string) {
    this.currencyService.patchState({ code });
  }
}
