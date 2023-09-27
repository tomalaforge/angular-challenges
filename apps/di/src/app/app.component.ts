/* eslint-disable @angular-eslint/directive-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Directive } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product, products } from './product.model';
import { CurrencyCodeDirective } from './currency-code.directive';

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
  imports: [
    TableModule,
    CurrencyCodeDirective,
    AsyncPipe,
    NgFor,
    ProductDirective,
  ],
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
          <td [code]="product.currencyCode">{{ product.priceA }}</td>
          <td [code]="product.currencyCode">{{ product.priceB }}</td>
          <td [code]="product.currencyCode">{{ product.priceC }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
