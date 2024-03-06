import { Component, computed, signal } from '@angular/core';

enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
}

/*
// Using `as const` can be a great alternative to either.
// You gain flexibility and consistency with such an implementation. 
// [See this Matt Pocock video for more](https://www.youtube.com/watch?v=jjMbPt_H3RQ) 

const Difficulty = {
  EASY: 'easy',
  NORMAL: 'normal'
} as const;

// Object.values(enum) can be useful to spot differences between enums and const enums.  
*/

type Difficulty = 'easy' | 'normal';

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
  readonly direction = signal<Direction | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    switch (this.difficulty()) {
      case 'easy':
        return 'easy';
      case 'normal':
        return 'normal';
    }
  });

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You choose to go';
    switch (this.direction()) {
      case Direction.LEFT:
        return `${prefix} ${Direction.LEFT}`;
      case Direction.RIGHT:
        return `${prefix} ${Direction.RIGHT}`;
      default:
        return 'Choose a direction!';
    }
  });
}
