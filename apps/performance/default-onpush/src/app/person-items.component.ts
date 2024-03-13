import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-person-items',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective, MatListModule],
  template: `
    <mat-list class="flex w-full">
      @if (names().length === 0) {
        <div class="empty-list-label">Empty list</div>
      }

      @for (name of names(); track name) {
        <mat-list-item cd-flash class="text-orange-500">
          <div MatListItemLine class="flex justify-between">
            <h3 title="Name">
              {{ name }}
            </h3>
          </div>
        </mat-list-item>
      }

      @if (names().length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonItemsComponent {
  names = input<string[]>([]);

  constructor() {
    effect(() => {
      console.log(`New value: ${this.names()}`);
    });
  }
}
