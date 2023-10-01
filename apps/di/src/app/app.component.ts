/* eslint-disable @angular-eslint/directive-selector */
import { NgFor } from '@angular/common';
import { Component, Directive } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product, products } from './product.model';
import { TableRowComponent } from './table-row-component';

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
  imports: [TableModule, NgFor, TableRowComponent],
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
        <tr app-table-row [product]="product"></tr>
      </ng-template>
    </p-table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
