import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-500">
      @if (topLoaded()) {
        <app-top />
      } @else {
        <app-placeholder />
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="topLoaded.set(true)">
          Load Top
        </button>
      }
    </div>
  `,
  standalone: false,
})
export class AppComponent {
  topLoaded = signal(false);
}
