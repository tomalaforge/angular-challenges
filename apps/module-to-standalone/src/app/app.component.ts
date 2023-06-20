import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: ` <div class="flex gap-2">
      <button
        routerLink="home"
        class="border px-4 py-2 border-blue-400 rounded-md">
        Home
      </button>
      <button
        routerLink="admin"
        class="border px-4 py-2 border-blue-400 rounded-md">
        Admin
      </button>
      <button
        routerLink="user"
        class="border px-4 py-2 border-blue-400 rounded-md">
        User
      </button>
    </div>
    <router-outlet></router-outlet>`,
  host: {
    class: 'flex flex-col p-4 gap-3',
  },
})
export class AppComponent {}
