import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-content></ng-content>
      <ng-content select="[delete-button]"></ng-content>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  constructor() {}
}
