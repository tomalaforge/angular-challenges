import { Component, inject } from '@angular/core';
import { RESPONSE_INIT } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p class="text-6xl font-bold text-pink-600">404</p>
      <p class="text-lg text-neutral-700 dark:text-neutral-300">This page could not be found.</p>
      <a
        routerLink="/"
        class="rounded-full bg-pink-600 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-500"
      >
        Back to home
      </a>
    </div>
  `,
})
export class NotFound {
  constructor() {
    const responseInit = inject(RESPONSE_INIT, { optional: true });
    if (responseInit) {
      responseInit.status = 404;
    }
  }
}
