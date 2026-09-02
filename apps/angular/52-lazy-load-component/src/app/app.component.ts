import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(button)) {
        <app-top />
      } @placeholder {
        <app-placeholder />
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          #button>
          Load Top
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TopComponent, PlaceholderComponent],
})
export class AppComponent {}
