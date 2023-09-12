import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-person-row',
  standalone: true,
  imports: [MatListModule, CDFlashingDirective],
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div MatListItemLine class="flex justify-between">
        <h3 title="Name">
          {{ name }}
        </h3>
      </div>
    </mat-list-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonRowComponent {
  @Input({ required: true }) name!: string;
}
