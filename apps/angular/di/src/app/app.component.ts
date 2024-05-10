import { TableComponent } from '@angular-challenges/angular/di';
import { AsyncPipe } from '@angular/common';
import { Component, Directive } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { ProductRowComponent } from './product-row.component';
import { Product, products } from './product.model';

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
    ctx: unknown,
  ): ctx is ProductContext {
    return true;
  }
}

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    ProductDirective,
    TableComponent,
    ProductRowComponent,
  ],
  selector: 'app-root',
  template: `
    <table [items]="products">
      <ng-template #header>
        <tr>
          @for (col of displayedColumns; track col) {
            <th>{{ col }}</th>
          }
        </tr>
      </ng-template>
      <ng-template #body product let-product>
        <tr product-row [product]="product"></tr>
      </ng-template>
    </table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
