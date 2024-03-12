import { Component, computed, signal } from '@angular/core';

type Difficulty = 'easy' | 'normal';

const Direction = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

type DirectionType = (typeof Direction)[keyof typeof Direction];

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
        <button mat-stroked-button (click)="direction.set(Direction.LEFT)">
          Left
        </button>
        <button mat-stroked-button (click)="direction.set(Direction.RIGHT)">
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

  readonly Direction = Direction;
  readonly direction = signal<DirectionType | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    return this.difficulty();
  });

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You chose to go';
    return this.direction()
      ? `${prefix} ${this.direction()}`
      : 'Choose a direction!';
  });
}
