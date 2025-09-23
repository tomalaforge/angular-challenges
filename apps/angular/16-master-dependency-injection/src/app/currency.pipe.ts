import { inject, Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { CurrencyService } from './currency.service';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  currencyService = inject(CurrencyService);

  transform(price: number) {
    return this.currencyService.symbol$.pipe(
      map((s) => `${String(price)}${s}`),
    );
  }
}
