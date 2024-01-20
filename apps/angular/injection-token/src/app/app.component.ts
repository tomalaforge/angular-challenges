import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  template: ` <div class="flex gap-4 mb-5">
      <button class="border rounded-md px-4 py-2" routerLink="video">
        Video
      </button>
      <button class="border rounded-md px-4 py-2" routerLink="phone">
        Phone
      </button>
    </div>
    <router-outlet />`,
  host: {
    class: 'p-10 flex flex-col',
  },
})
export class AppComponent {}
