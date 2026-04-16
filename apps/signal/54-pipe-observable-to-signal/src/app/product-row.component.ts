import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product } from './product.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[product-row]',
  template: `
    <td>{{ productInfo().name }}</td>
    <td>{{ productInfo().priceA | currency }}</td>
    <td>{{ productInfo().priceB | currency }}</td>
    <td>{{ productInfo().priceC | currency }}</td>
  `,
  imports: [CurrencyPipe],
  providers: [CurrencyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  productInfo = input.required<Product>({ alias: 'product' });
  currencyService = inject(CurrencyService);

  constructor() {
    effect(() => {
      const product = this.productInfo();
      this.currencyService.updateCode(product.currencyCode);
    });
  }
}
