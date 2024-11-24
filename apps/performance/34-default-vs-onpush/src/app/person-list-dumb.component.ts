import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-person-list-dumb',
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
  imports: [MatListModule, CDFlashingDirective, CommonModule],
  host: {
    class: 'w-full flex flex-col items-center',
  },
  standalone: true,
})
export class PersonListDumbComponent {
  @Input() name!: string;
}
