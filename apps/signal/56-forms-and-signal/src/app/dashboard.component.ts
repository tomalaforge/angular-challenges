import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { products } from './products';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <div class="overflow-hidden rounded-lg bg-white shadow-md">
      <h2 class="bg-gray-800 px-6 py-4 text-lg font-semibold text-white">
        Available Products
      </h2>

      <ul class="divide-y divide-gray-200">
        @for (product of products; track product.id) {
          <li class="transition-colors hover:bg-gray-50">
            <div class="flex items-center justify-between px-6 py-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  {{ product.name }}
                </h3>
                <p class="font-semibold text-blue-600">{{ product.price }}€</p>
              </div>
              <button
                class="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white
                       transition-colors hover:bg-blue-700 focus:outline-none
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                routerLink="/order"
                [queryParams]="{ productId: product.id }">
                Buy Now
              </button>
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  products = products;
}
