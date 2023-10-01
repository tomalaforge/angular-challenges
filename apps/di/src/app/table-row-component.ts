import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { Product } from './product.model';
import { CurrencyPipe } from './currency.pipe';
import { CommonModule } from '@angular/common';
import { CurrencyService } from './currency.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-table-row]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <td>{{ product.name }}</td>
    <td>{{ product.priceA | currency | async }}</td>
    <td>{{ product.priceB | currency | async }}</td>
    <td>{{ product.priceC | currency | async }}</td>
  `,
  imports: [CommonModule, CurrencyPipe],
  providers: [CurrencyService],
})
export class TableRowComponent implements OnInit {
  @Input({ required: true }) product!: Product;

  currencyService = inject(CurrencyService);

  ngOnInit() {
    this.currencyService.setCode(this.product.currencyCode);
  }
}
