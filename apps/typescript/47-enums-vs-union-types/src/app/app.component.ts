import { Component, computed, signal } from '@angular/core';

// Union type for Difficulty
type Difficulty = 'easy' | 'normal';

// Mapped type for Direction
type Direction = { [K in 'left' | 'right']: K };
const DIRECTION: Direction = {
  left: 'left',
  right: 'right',
} as const;

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
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
          <button mat-stroked-button (click)="direction.set(DIRECTION.left)">
            Left
          </button>
          <button mat-stroked-button (click)="direction.set(DIRECTION.right)">
            Right
          </button>
        </div>
        <p>{{ directionLabel() }}</p>
      </section>
    </div>
  `,
})
export class AppComponent {
  readonly DIRECTION = DIRECTION;
  readonly difficulty = signal<Difficulty>('easy');
  readonly direction = signal<Direction[keyof Direction] | undefined>(
    undefined,
  );

  readonly difficultyLabel = computed<string>(() => {
    return this.difficulty();
  });

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You chose to go';
    const currentDirection = this.direction();

    if (!currentDirection) {
      return 'Choose a direction!';
    }

    return `${prefix} ${currentDirection}`;
  });
}
