import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav
      class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
      <a
        routerLink="/form"
        routerLinkActive="bg-gray-300 hover:bg-gray-300"
        class="inline-block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100  focus:relative">
        Form
      </a>
      <a
        routerLink="/page-1"
        routerLinkActive="bg-gray-300 hover:bg-gray-300"
        class="inline-block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100  focus:relative">
        Page 1
      </a>
      <a
        routerLink="/page-2"
        routerLinkActive="bg-gray-300 hover:bg-gray-300"
        class="inline-block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100  focus:relative">
        Page 2
      </a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {}
