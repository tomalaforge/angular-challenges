import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-person-list-container',
  imports: [
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    CDFlashingDirective,
  ],
  template: `
    <mat-list class="flex w-full">
      @if (names?.length === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      @for (name of names; track name) {
        <mat-list-item cd-flash class="text-orange-500">
          <div class="flex justify-between">
            <h3 title="Name">
              {{ name }}
            </h3>
          </div>
        </mat-list-item>
      }
      @if (names?.length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListContainerComponent {
  @Input() names: string[] = [];
}
