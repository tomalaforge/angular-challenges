import { Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(loadTop)) {
        <app-top />
      } @placeholder (minimum 2000ms) {
        <app-placeholder />
      }
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        #loadTop>
        Load Top
      </button>
    </div>
  `,
  standalone: true,
  imports: [TopComponent, PlaceholderComponent],
})
export class AppComponent {}
