import { Component, computed, signal } from '@angular/core';

const Difficulty = {
  EASY: 'easy',
  NORMAL: 'normal',
} as const;
type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

type Direction = { [K in 'left' | 'right']: string };

@Component({
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
    @reference "tailwindcss";

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
  readonly difficulty = signal<Difficulty>(Difficulty.EASY);
  readonly direction = signal<keyof Direction | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    switch (this.difficulty()) {
      case Difficulty.EASY:
        return Difficulty.EASY;
      case Difficulty.NORMAL:
        return Difficulty.NORMAL;
    }
  });

  readonly directionLabel = computed<string>(() => {
    if (!this.direction()) return 'Choose a direction!';
    return `You chose to go ${this.direction()}`;
  });
}
