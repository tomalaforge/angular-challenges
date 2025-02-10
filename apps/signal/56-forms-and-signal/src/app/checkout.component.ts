import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderStateService } from './order-state.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h2 class="mb-6 text-xl font-semibold text-gray-800">Checkout</h2>

      <button
        routerLink="/order"
        queryParamsHandling="merge"
        class="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700">
        <span class="mr-2">←</span>
        Back to Order
      </button>

      <!-- Order Summary -->
      <div class="mb-8 rounded-lg bg-gray-50 p-4">
        <h3 class="mb-4 font-medium text-gray-700">Order Summary</h3>
        <div class="flex items-center justify-between">
          <div class="text-gray-600">
            {{ orderState.product()?.name }} × {{ orderState.quantity() }}
          </div>
          <div class="text-lg font-semibold text-blue-600">
            {{ orderState.total() }}€
          </div>
        </div>
      </div>

      <!-- Billing Information -->
      <div class="space-y-6">
        <h3 class="font-medium text-gray-700">Billing Information</h3>
        <div class="rounded-lg bg-gray-50 p-4 text-gray-500">
          Form fields would go here...
        </div>
      </div>

      <button
        routerLink="/payment"
        [queryParams]="{ quantity: orderState.quantity() }"
        queryParamsHandling="merge"
        class="mt-8 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white
               transition-colors hover:bg-blue-700 focus:outline-none
               focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Proceed to Payment
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckoutComponent {
  protected orderState = inject(OrderStateService);
}
