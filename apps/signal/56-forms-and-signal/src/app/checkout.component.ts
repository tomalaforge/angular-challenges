import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { products } from './products';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <h2 class="mb-1 w-full bg-gray-400 p-2 text-white">Checkout</h2>
    <button
      routerLink="/order"
      queryParamsHandling="merge"
      class="mb-5 text-blue-400">
      < back to order
    </button>
    <section class="mb-5 flex justify-between">
      <div class="font-bold">Your order:</div>
      <div>
        {{ quantity() }} x {{ product()?.name }}: {{ product()?.price }}€
      </div>
    </section>

    <div>Billing Information</div>
    <div>...</div>
    <div>...</div>
    <div>...</div>
    <div>...</div>
    <div>...</div>

    <button
      routerLink="/payment"
      [queryParams]="{ quantity: quantity() }"
      queryParamsHandling="merge"
      class="w-full rounded-full border bg-blue-500 p-2 text-white">
      Pay
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  quantity = input(1);
  productId = input('1');

  product = computed(() =>
    products.find((product) => product.id === this.productId()),
  );
  totalWithVAT = computed(
    () => this.quantity() * (this.product()?.price ?? 0) * 1.21,
  );
}
