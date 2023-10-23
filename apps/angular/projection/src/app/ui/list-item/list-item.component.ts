import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      <ng-content select="[name]"></ng-content>
      <ng-content select="[deleteBtn]"></ng-content>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {}
