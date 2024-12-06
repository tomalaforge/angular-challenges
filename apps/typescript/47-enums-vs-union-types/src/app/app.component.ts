import { Component, computed, signal } from '@angular/core';

enum Difficulty {
  EASY = 'easy',
  NORMAL = 'normal',
}

enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
}

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="difficulty.set(Difficulty.EASY)">
          Easy
        </button>
        <button mat-stroked-button (click)="difficulty.set(Difficulty.NORMAL)">
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
  readonly Difficulty = Difficulty;
  readonly difficulty = signal<Difficulty>(Difficulty.EASY);

  readonly Direction = Direction;
  readonly direction = signal<Direction | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    switch (this.difficulty()) {
      case Difficulty.EASY:
        return Difficulty.EASY;
      case Difficulty.NORMAL:
        return Difficulty.NORMAL;
    }
  });

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You chose to go';
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
