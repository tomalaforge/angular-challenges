import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderStateService } from './order-state.service';

@Component({
  selector: 'app-order',
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h2 class="mb-6 text-xl font-semibold text-gray-800">Order Details</h2>

      <section class="space-y-6">
        <!-- Product Info -->
        <div class="rounded-lg bg-gray-50 p-4">
          <h3 class="mb-2 font-medium text-gray-700">Selected Product</h3>
          <div class="text-gray-600">{{ orderState.product()?.name }}</div>
          <div class="text-lg font-semibold text-blue-600">
            {{ orderState.product()?.price }}€
          </div>
        </div>

        <!-- Quantity Selector -->
        <form class="rounded-lg bg-gray-50 p-4" [formGroup]="form">
          <label
            for="quantity"
            class="mb-2 block text-sm font-medium text-gray-700">
            Select Quantity
          </label>
          <select
            formControlName="quantity"
            id="quantity"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            @for (q of quantities; track q) {
              <option [value]="q">{{ q }}</option>
            }
          </select>
        </form>

        <!-- Price Breakdown -->
        <div class="divide-y rounded-lg border">
          <div class="flex justify-between p-4">
            <div class="text-gray-600">Subtotal</div>
            <div class="font-medium">{{ orderState.totalWithoutVat() }}€</div>
          </div>
          <div class="flex justify-between p-4">
            <div class="text-gray-600">VAT (21%)</div>
            <div class="font-medium">{{ orderState.vat() }}€</div>
          </div>
          <div class="flex justify-between bg-gray-50 p-4">
            <div class="font-semibold">Total</div>
            <div class="text-lg font-semibold">{{ orderState.total() }}€</div>
          </div>
        </div>

        <!-- Checkout Button -->
        <button
          routerLink="/checkout"
          [queryParams]="{ quantity: orderState.quantity() }"
          queryParamsHandling="merge"
          class="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white
                 transition-colors hover:bg-blue-700 focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Proceed to Checkout
        </button>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderComponent {
  protected orderState = inject(OrderStateService);
  protected quantities = [1, 2, 3, 4, 5];

  @Input() set productId(id: string) {
    this.orderState.updateProductId(id);
  }

  form = new FormGroup({
    quantity: new FormControl(this.orderState.quantity(), {
      nonNullable: true,
    }),
  });

  constructor() {
    // Update state when form changes
    effect(() => {
      const quantity = Number(this.form.get('quantity')?.value);
      if (quantity) {
        this.orderState.updateQuantity(quantity);
      }
    });

    // Update form when state changes
    effect(() => {
      this.form.patchValue(
        { quantity: this.orderState.quantity() },
        { emitEvent: false },
      );
    });
  }
}
