import { Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';
@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(loadBtn)) {
        <app-top />
      } @placeholder {
        <app-placeholder />
        <button
          #loadBtn
          class="rounded-sm border border-blue-500 bg-blue-300 p-2">
          Load Top
        </button>
      }
    </div>
  `,
  standalone: true,
  imports: [PlaceholderComponent, TopComponent],
})
export class AppComponent {}
