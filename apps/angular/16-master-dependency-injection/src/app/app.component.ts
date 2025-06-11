import { TableComponent } from '@angular-challenges/shared/ui';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Directive, effect, inject, input } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
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

@Directive({
  selector: '[currencyCode]',
  standalone: true,
})
export class CurrencyCodeDirective {
  service = inject(CurrencyService);
  currencyCode = input<string>('');

  constructor() {
    effect(() => {
      this.service.patchState({ code: this.currencyCode() });
    });
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
    CurrencyCodeDirective,
  ],
  providers: [CurrencyService],
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
        <tr [currencyCode]="product.currencyCode">
          <td>{{ product.name }}</td>
          <td>{{ product.priceA | currency | async }}</td>
          <td>{{ product.priceB | currency | async }}</td>
          <td>{{ product.priceC | currency | async }}</td>
        </tr>
      </ng-template>
    </table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
