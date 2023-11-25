import { TableComponent } from '@angular-challenges/angular/di';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Directive, inject, Input } from '@angular/core';
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
    ctx: unknown
  ): ctx is ProductContext {
    return true;
  }
}

@Directive({
  selector: '[currencyCode]',
  standalone: true,
  providers: [CurrencyService],
})
export class CurrencyCodeDirective {
  currencyService = inject(CurrencyService);

  @Input() public set currencyCode(code: string) {
    this.currencyService.patchState({ code });
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
