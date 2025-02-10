import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from './currency.service';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  private currencyService = inject(CurrencyService);

  transform(price: number): string {
    return `${price}${this.currencyService.symbol()}`;
  }
}
