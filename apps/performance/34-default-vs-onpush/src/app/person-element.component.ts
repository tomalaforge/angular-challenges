import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-person-element',
  standalone: true,
  imports: [CDFlashingDirective, MatListItem, NgForOf],
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
export class PersonElementComponent {
  @Input({ required: true })
  public name!: string;
}
