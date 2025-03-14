import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  numberAttribute,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { products } from './products';

@Component({
  selector: 'app-order',
  imports: [RouterLink, FormsModule],
  template: `
    <h2 class="mb-5 w-full bg-gray-400 p-2 text-white">Order</h2>
    <section class="flex flex-col gap-5">
      <form class="flex items-center justify-between gap-5">
        <label for="countries" class="mb-2 block text-nowrap text-gray-900">
          Select a quantity
        </label>
        <select
          [(ngModel)]="selectedQuantity"
          [ngModelOptions]="{ standalone: true }"
          id="countries"
          class="block w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
      <div class="flex justify-between">
        <div>SubTotal</div>
        <div>{{ totalWithoutVat() }} €</div>
      </div>
      <div class="flex justify-between">
        <div>VAT (21%)</div>
        <div>{{ vat() }} €</div>
      </div>
      <div class="flex justify-between">
        <div>Total</div>
        <div>{{ total() }} €</div>
      </div>
      <button
        routerLink="/checkout"
        [queryParams]="{ quantity: selectedQuantity() }"
        queryParamsHandling="merge"
        class="w-full rounded-full border bg-blue-500 p-2 text-white">
        Checkout
      </button>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderComponent {
  productId = input('1');
  quantity = input<number, string>(1, {
    transform: (v) => numberAttribute(v, 1),
  });

  selectedQuantity = linkedSignal(() => this.quantity());
  price = computed(
    () => products.find((p) => p.id === this.productId())?.price ?? 0,
  );
  totalWithoutVat = computed(
    () => Number(this.price()) * this.selectedQuantity(),
  );
  vat = computed(() => this.totalWithoutVat() * 0.21);
  total = computed(() => this.totalWithoutVat() + this.vat());
}
