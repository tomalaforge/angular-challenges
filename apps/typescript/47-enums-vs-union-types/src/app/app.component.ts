import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

type Difficulty = 'easy' | 'normal';
type Direction = 'left' | 'right';

const directions: Record<Direction, string> = {
  left: 'You chose to go left',
  right: 'You chose to go right',
};

@Component({
  standalone: true,
  imports: [MatButton],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="difficulty.set('easy')">
          Easy
        </button>
        <button mat-stroked-button (click)="difficulty.set('normal')">
          Normal
        </button>
      </div>
      <p>Selected Difficulty: {{ difficulty() }}</p>
    </section>

    <section>
      <div>
        <button mat-stroked-button (click)="direction.set('left')">Left</button>
        <button mat-stroked-button (click)="direction.set('right')">
          Right
        </button>
      </div>
      <p>{{ directionLabel() }}</p>
    </section>
  `,
  styles: `
    section {
      @apply mx-auto my-5 flex w-fit flex-col items-center gap-2;

      > div {
        @apply flex w-fit gap-5;
      }
    }

    button {
      @apply rounded-md border px-4 py-2;
    }
  `,
})
export class AppComponent {
  readonly difficulty = signal<Difficulty>('easy');

  readonly direction = signal<Direction | undefined>(undefined);

  readonly directionLabel = computed<string>(() => {
    const direction = this.direction();
    if (direction) {
      return directions[direction];
    } else {
      return 'Choose a direction!';
    }
  });
}
