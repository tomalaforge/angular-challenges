import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-person-list-viewer-item',
  standalone: true,
  imports: [CommonModule, MatListModule, MatChipsModule, CDFlashingDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div cd-flash MatListItemLine class="flex justify-between">
      <h3 title="Name">
        {{ name }}
      </h3>
    </div>
  `,
  host: {
    class: '',
  },
})
export class PersonListViewerItemComponent {
  @Input({ required: true }) name!: string;
}
