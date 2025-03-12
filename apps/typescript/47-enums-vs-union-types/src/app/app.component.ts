import { Component, computed, signal } from '@angular/core';

type DifficultyUnion = 'EASY' | 'NORMAL';

type DirectionUnion = 'LEFT' | 'RIGHT';

type DirectionMap = {
  [K in DirectionUnion]: string;
};

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="difficulty.set('EASY')">
          Easy
        </button>
        <button mat-stroked-button (click)="difficulty.set('NORMAL')">
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
  readonly difficulty = signal<DifficultyUnion>('EASY');

  readonly Direction: DirectionMap = {
    LEFT: 'left',
    RIGHT: 'right',
  };

  readonly direction = signal<string | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    switch (this.difficulty()) {
      case 'EASY':
        return 'EASY';
      case 'NORMAL':
        return 'NORMAL';
    }
  });

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You chose to go';
    switch (this.direction()) {
      case this.Direction.LEFT:
        return `${prefix} ${this.Direction.LEFT}`;
      case this.Direction.RIGHT:
        return `${prefix} ${this.Direction.RIGHT}`;
      default:
        return 'Choose a direction!';
    }
  });
}
