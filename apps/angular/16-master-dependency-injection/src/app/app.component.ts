import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Injector,
} from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CURRENCY_CODE, CurrencyService } from './currency.service';
import { Product, products } from './product.model';

interface ProductContext {
  $implicit: Product;
}

@Directive({
  selector: 'ng-template[product]',
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
  imports: [CommonModule, CurrencyPipe, AsyncPipe],
  selector: 'app-root',
  template: `
    <table>
      <thead>
        <tr>
          <th *ngFor="let col of displayedColumns">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let product of products">
          <ng-template
            [ngTemplateOutletInjector]="createInjector(product)"
            [ngTemplateOutlet]="row"
            [ngTemplateOutletContext]="{ $implicit: product }"></ng-template>
        </ng-container>
        <ng-template #row let-product>
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.priceA | currency | async }}</td>
            <td>{{ product.priceB | currency | async }}</td>
            <td>{{ product.priceC | currency | async }}</td>
          </tr>
        </ng-template>
      </tbody>
    </table>
    <ng-container
      *ngComponentOutlet="
        null;
        inputs: { product: products[0] };
        content: [[productTest], displayedColumns]
      "></ng-container>
    <ng-content select="[product]"></ng-content>
    <ng-template #productTest></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];

  createInjector(product: Product) {
    return Injector.create({
      providers: [
        { provide: CURRENCY_CODE, useValue: product.currencyCode },
        CurrencyService,
      ],
    });
  }
}
