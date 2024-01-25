import { Component } from '@angular/core';

@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [],
  template: `
    <div class="count">app-foo</div>
  `,
  host: {
    class: 'block h-full bg-red-500',
  },
  styles: `
      .count {
        view-transition-name: count;
        width: fit-content
      }
    `,
})
export default class FooComponent {}
