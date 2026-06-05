import { TableComponent } from '@angular-challenges/shared/ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductRowComponent } from './product-row.component';
import { products } from './product.model';

@Component({
  imports: [TableComponent, ProductRowComponent],
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
      <ng-template #body let-product>
        <tr product-row [product]="product"></tr>
      </ng-template>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
