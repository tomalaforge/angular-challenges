import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

// source of trust
const difficulty = {
  easy: 'easy',
  normal: 'normal',
};

// type is derived from the map type
type Difficulty = keyof typeof difficulty;

// --------

// source of trust
type Direction = 'left' | 'right';

// record is constructed from the type.
const direction: Record<Direction, (prefix: string) => string> = {
  left: (prefix: string) => `${prefix} left`,
  right: (prefix: string) => `${prefix} right`,
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
      <p>Selected Difficulty: {{ difficultyLabel() }}</p>
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
      @apply flex flex-col mx-auto my-5 w-fit gap-2 items-center;

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

  readonly difficultyLabel = computed<string>(
    () => difficulty[this.difficulty()],
  );

  readonly directionLabel = computed(() =>
    this.direction()
      ? direction[this.direction()!]('You chose to go')
      : 'Choose a direction',
  );
}
