import { Component, computed, signal } from '@angular/core';

type Difficulty = { [K in 'EASY' | 'NORMAL']: string };
type Direction = { [K in 'LEFT' | 'RIGHT']: string };

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
        <button mat-stroked-button (click)="direction.set('LEFT')">Left</button>
        <button mat-stroked-button (click)="direction.set('RIGHT')">
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
  readonly difficulty = signal<keyof Difficulty>('EASY');
  readonly direction = signal<keyof Direction | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => this.difficulty());

  readonly directionLabel = computed<string>(() => {
    if (!this.direction()) {
      return 'Choose a direction!';
    }

    return `You chose to go ${this.direction()}`;
  });
}
