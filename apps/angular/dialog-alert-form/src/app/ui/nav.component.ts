import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav
      class="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
      <a
        routerLink="/form"
        routerLinkActive="bg-gray-900 text-gray-50 hover:bg-none"
        class="inline-block px-4 py-2 text-sm font-medium text-gray-700   focus:relative">
        Form
      </a>
      <a
        routerLink="/page-1"
        routerLinkActive="bg-gray-900 text-gray-50 hover:bg-none"
        class="inline-block px-4 py-2 text-sm font-medium text-gray-700   focus:relative">
        Page 1
      </a>
      <a
        routerLink="/page-2"
        routerLinkActive="bg-gray-900 text-gray-50 hover:bg-none"
        class="inline-block px-4 py-2 text-sm font-medium text-gray-700   focus:relative">
        Page 2
      </a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {}
