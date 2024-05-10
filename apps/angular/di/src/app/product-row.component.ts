import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product } from './product.model';

@Component({
  standalone: true,
  selector: 'tr[product-row]',
  template: `
    <td>{{ product().name }}</td>
    <td>{{ (product().priceA | currency)() }}</td>
    <td>{{ (product().priceB | currency)() }}</td>
    <td>{{ (product().priceC | currency)() }}</td>
  `,
  imports: [AsyncPipe, CurrencyPipe],
  providers: [CurrencyService],
})
export class ProductRowComponent {
  product = input.required<Product>();
  currencyService = inject(CurrencyService);

  constructor() {
    effect(
      () => {
        const code = this.product().currencyCode;
        this.currencyService.code.set(code);
      },
      // I think this is safe because the value used to set the state doesn't
      // come from the service, but is there a better way?
      { allowSignalWrites: true },
    );
  }
}
