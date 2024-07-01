import { computed, inject, Pipe, PipeTransform, Signal } from '@angular/core';
import { CurrencyService } from './currency.service';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  currencyService = inject(CurrencyService);

  transform(price: number): Signal<string> {
    return computed(() => `${price}${this.currencyService.symbol()}`);
  }
}
