/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, Input, inject } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[appCurrency]',
  standalone: true,
  providers: [CurrencyService],
})
export class CurrencyDirective {
  private readonly currencySerivce = inject(CurrencyService);
  @Input('appCurrency') set appCurrency(value: string) {
    this.currencySerivce.code.set(value);
  }
}
