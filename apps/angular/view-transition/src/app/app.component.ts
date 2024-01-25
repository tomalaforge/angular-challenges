import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  template: `
    <div class="flex gap-3">
      <button
        class="rounded-md border border-blue-500 bg-blue-200 px-4 py-2 text-xl"
        routerLink="foo">
        Foo
      </button>
      <button
        class="rounded-md border border-blue-500 bg-blue-200 px-4 py-2 text-xl"
        routerLink="bar">
        Bar
      </button>
    </div>
    <router-outlet />
  `,
  host: {
    class: 'flex flex-col gap-10 border p-10 h-screen',
  },
  styles: [''],
})
export class AppComponent {}
