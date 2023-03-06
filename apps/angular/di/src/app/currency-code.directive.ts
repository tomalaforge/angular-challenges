/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject, Input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[code]',
  providers: [CurrencyService],
  standalone: true,
})
export class CurrencyCodeDirective {
  currencyService = inject(CurrencyService);

  @Input() set code(code: string) {
    this.currencyService.patchState({ code });
  }
}
