import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <div class="rounded-lg bg-white p-6 text-center shadow-md">
      <div class="mb-8">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            class="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="mb-2 text-2xl font-bold text-gray-900">
          Payment Successful!
        </h2>
        <p class="text-gray-600">Thank you for your purchase</p>
      </div>

      <button
        routerLink="/dashboard"
        class="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white
               transition-colors hover:bg-blue-700 focus:outline-none
               focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Return to Shop
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
