import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product } from './product.model';

@Component({
  selector: 'tr[product-row]',
  template: `
    <td>{{ productInfo.name }}</td>
    <td>{{ productInfo.priceA | currency | async }}</td>
    <td>{{ productInfo.priceB | currency | async }}</td>
    <td>{{ productInfo.priceC | currency | async }}</td>
  `,
  imports: [AsyncPipe, CurrencyPipe],
  providers: [CurrencyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  protected productInfo!: Product;

  @Input({ required: true }) set product(product: Product) {
    this.currencyService.updateCode(product.currencyCode);
    this.productInfo = product;
  }

  currencyService = inject(CurrencyService);
}
