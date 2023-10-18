/* eslint-disable @angular-eslint/directive-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Directive } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product, products } from './product.model';

interface ProductContext {
  $implicit: Product;
}

@Directive({
  selector: 'ng-template[pTemplate="body"]',
  standalone: true,
})
export class ProductDirective {
  static ngTemplateContextGuard(
    dir: ProductDirective,
    ctx: unknown
  ): ctx is ProductContext {
    return true;
  }
}

@Component({
  standalone: true,
  imports: [TableModule, CurrencyPipe, AsyncPipe, NgFor, ProductDirective],
  providers: [CurrencyService],
  selector: 'app-root',
  template: `
    <p-table [value]="products">
      <ng-template pTemplate="header">
        <tr>
          <th *ngFor="let col of displayedColumns">
            {{ col }}
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-product>
        <tr>
          <td>{{ product.name }}</td>
          <td>{{ product.priceA | currency | async }}</td>
          <td>{{ product.priceB | currency | async }}</td>
          <td>{{ product.priceC | currency | async }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
