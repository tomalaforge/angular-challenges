import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <h2 class="mb-1 w-full bg-green-700 p-2 text-white">Payment Success</h2>

    <button
      routerLink="/dashboard"
      class="w-full rounded-full border bg-blue-500 p-2 text-white">
      Back to Shop
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
