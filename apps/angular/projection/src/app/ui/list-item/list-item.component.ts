import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      {{ name }}
      <ng-content select="[button]"></ng-content>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() name!: string;
}
