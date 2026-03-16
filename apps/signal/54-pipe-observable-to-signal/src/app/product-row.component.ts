import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { getCurrency } from './currency.service';
import { Product } from './product.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[product-row]',
  template: `
    <td>{{ product().name }}</td>
    <td>{{ product().priceA }}{{ currency() }}</td>
    <td>{{ product().priceB }}{{ currency() }}</td>
    <td>{{ product().priceC }}{{ currency() }}</td>
  `,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  readonly product = input.required<Product>();
  readonly currency = computed(() => getCurrency(this.product().currencyCode));
}
