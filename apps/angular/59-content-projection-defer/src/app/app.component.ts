import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  template: `
    <div class="flex gap-2">
      <button class="rounded-md border px-4 py-2" routerLink="/page-1">
        Page 1
      </button>
      <button class="rounded-md border px-4 py-2" routerLink="/page-2">
        Page 2
      </button>
    </div>
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-2 ',
  },
})
export class AppComponent {}
