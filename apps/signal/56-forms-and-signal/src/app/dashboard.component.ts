import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { products } from './products';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <h2 class="mb-5 w-full bg-gray-400 p-2 text-white">List of Products</h2>
    <ul class="w-full *:border-b *:border-l *:border-r *:p-4">
      @for (product of products; track product.id) {
        <li [class.border-t]="$first">
          <div class="flex w-full justify-between">
            {{ product.name }} ({{ product.price }}€)
            <button
              class="w-20 rounded-full border bg-blue-500 p-2 text-white"
              routerLink="/order"
              [queryParams]="{ productId: product.id }">
              Buy
            </button>
          </div>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  products = products;
}
