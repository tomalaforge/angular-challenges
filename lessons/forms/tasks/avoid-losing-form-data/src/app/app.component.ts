import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './ui/nav.component';

@Component({
  imports: [RouterOutlet, NavComponent],
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-50">
      <app-nav
        class="mx-auto flex w-full items-center justify-center pb-2 pt-8" />

      <main class="px-4 py-16 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
