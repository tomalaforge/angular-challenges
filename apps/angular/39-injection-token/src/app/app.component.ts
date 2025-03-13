import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { timerProvider } from './data';

@Component({
  imports: [RouterOutlet, RouterLink],
  standalone: true,
  selector: 'app-root',
  providers: [timerProvider],
  template: `
    <div class="mb-5 flex gap-4">
      <button class="rounded-md border px-4 py-2" routerLink="video">
        Video
      </button>
      <button class="rounded-md border px-4 py-2" routerLink="phone">
        Phone
      </button>
    </div>
    <router-outlet />
  `,
  host: {
    class: 'p-10 flex flex-col',
  },
})
export class AppComponent {}
