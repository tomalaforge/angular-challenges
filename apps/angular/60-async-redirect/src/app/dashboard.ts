import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="mb-4 flex gap-2">
      <button
        class="rounded border border-black bg-white px-4 py-2 text-black hover:bg-gray-200"
        routerLink="/profile">
        Profile Page
      </button>
      <button
        class="rounded border border-black bg-white px-4 py-2 text-black hover:bg-gray-200"
        routerLink="/account">
        User Page
      </button>
    </div>
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
})
export class Dashboard {}
