import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="mb-8 bg-white shadow-sm">
        <div class="mx-auto max-w-4xl px-6 py-4">
          <h1 class="text-3xl font-bold text-gray-900">Shop</h1>
        </div>
      </header>

      <main class="mx-auto max-w-4xl px-6 pb-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppComponent {}
