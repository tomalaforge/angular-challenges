import { Component, computed, signal } from '@angular/core';

const DIFFICULTY = {
  easy: 'easy',
  normal: 'normal',
} as const;
type Difficulty = keyof typeof DIFFICULTY;

type Direction = 'left' | 'right';
type DirectionMap = { [key in Direction]: string };
const DIRECTION: DirectionMap = {
  left: 'left',
  right: 'right',
} as const;

@Component({
  standalone: true,
  imports: [],
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

  readonly difficultyLabel = computed<string>(
    () => DIFFICULTY[this.difficulty()],
  );

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You chose to go';
    return this.direction()
      ? `${prefix} ${DIRECTION[this.direction()!]}`
      : 'Choose a direction!';
  });
}
