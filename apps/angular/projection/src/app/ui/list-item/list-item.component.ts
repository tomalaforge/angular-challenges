import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      <ng-content />
      <ng-content select="delete-button" />
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {}
