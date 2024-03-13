import { Component, computed, signal } from '@angular/core';

/* Union Type */
type Difficulty = keyof typeof difficulty;
const difficulty = {
  easy: 'easy',
  normal: 'normal',
};

/* Mapped Type */
type Direction = 'left' | 'right';
const direction: Record<Direction, string> = {
  left: 'left',
  right: 'right',
};

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
      ? `You chose to go ${direction[this.direction()!]}`
      : 'Choose a direction',
  );
}
