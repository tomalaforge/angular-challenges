import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name() }}
      <ng-content select="[delete]"></ng-content>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  name = input.required<string>();
}
