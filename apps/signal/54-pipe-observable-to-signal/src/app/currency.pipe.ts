import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from './currency.service';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  currencyService = inject(CurrencyService);

  transform(price: number): string {
    const symbol = this.currencyService.symbol();
    return `${price}${symbol}`;
  }
}
