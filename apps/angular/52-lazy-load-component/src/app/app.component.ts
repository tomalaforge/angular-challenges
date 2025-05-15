import { Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
  selector: 'app-root',
  imports: [TopComponent, PlaceholderComponent],

  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(loadComponent)) {
        <app-top />
      } @placeholder {
        <app-placeholder />
        <button
          #loadComponent
          class="rounded-sm border border-blue-500 bg-blue-300 p-2">
          Load Top
        </button>
      }
    </div>
  `,
})
export class AppComponent {}
