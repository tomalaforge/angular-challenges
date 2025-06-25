import { Component, computed, signal } from '@angular/core';

type Difficulty = keyof typeof difficulty;
const difficulty = {
  easy: 'easy',
  normal: 'normal',
};

type Direction = 'left' | 'right';
type DirectionMap = { [key in Direction]: string };
const directions: DirectionMap = {
  left: 'left',
  right: 'right',
};

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
    () => difficulty[this.difficulty()],
  );

  readonly directionLabel = computed(() =>
    this.direction()
      ? `You chose to go ${directions[this.direction()!]}`
      : 'Choose a direction',
  );
}
