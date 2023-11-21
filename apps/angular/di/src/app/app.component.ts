import { TableComponent } from '@angular-challenges/angular/di';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Directive } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { Product, products } from './product.model';
import { CurrencyDirective } from './currency.directive';

interface ProductContext {
  $implicit: Product;
}

@Directive({
  selector: 'ng-template[product]',
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
    TableComponent,
    CurrencyPipe,
    AsyncPipe,
    NgFor,
    ProductDirective,
    CurrencyDirective,
  ],
  selector: 'app-root',
  template: `
    <table [items]="products">
      <ng-template #header>
        <tr>
          <th *ngFor="let col of displayedColumns">
            {{ col }}
          </th>
        </tr>
      </ng-template>
      <ng-template #body product let-product>
        <tr [appCurrency]="product.currencyCode">
          <td>{{ product.name }}</td>
          <td>
            {{ product.priceA | currency }}
          </td>
          <td>
            {{ product.priceB | currency }}
          </td>
          <td>
            {{ product.priceC | currency }}
          </td>
        </tr>
      </ng-template>
    </table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
