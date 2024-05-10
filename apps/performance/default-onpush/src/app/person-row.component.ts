import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatListItem } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-person-row',
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div MatListItemLine class="flex justify-between">
        <h3 title="Name">
          {{ name() }}
        </h3>
      </div>
    </mat-list-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective, MatListItem],
})
export class PersonRowComponent {
  name = input.required<string>();
}
