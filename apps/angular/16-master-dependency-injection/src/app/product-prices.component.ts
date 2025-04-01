import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product } from './product.model';

@Component({
  selector: 'tr[product]',
  providers: [CurrencyService],
  imports: [CurrencyPipe, AsyncPipe],
  template: `
    <td>{{ product().name }}</td>
    <td>{{ product().priceA | currency | async }}</td>
    <td>{{ product().priceB | currency | async }}</td>
    <td>{{ product().priceC | currency | async }}</td>
  `,
})
export class ProductPricesComponent implements OnInit {
  product = input.required<Product>();

  #currencyService = inject(CurrencyService);

  ngOnInit() {
    this.#currencyService.setState({ code: this.product().currencyCode });
  }
}
