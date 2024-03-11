import { Component, computed, signal } from '@angular/core';

type Difficulty = 'Easy' | 'Normal';
type Direction = 'left' | 'right';

type DirectionLabelMap = { [key in Direction]: string };

const directionLabels: DirectionLabelMap = {
  left: 'Left',
  right: 'Right',
};

/*  line 6 to 11 can be refactored to use Record type like below.
    I commented this out since the challenge is to use a Mapped type */

// const directionLabels: Record<Direction, string> = {
//   left: 'Left',
//   right: 'Right',
// };

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="difficulty.set('Easy')">
          Easy
        </button>
        <button mat-stroked-button (click)="difficulty.set('Normal')">
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
  readonly difficulty = signal<Difficulty>('Easy');
  readonly direction = signal<Direction | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => this.difficulty());

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You choosed to go';
    const selectedDirection = this.direction();
    return selectedDirection
      ? `${prefix} ${directionLabels[selectedDirection]}`
      : 'Choose a direction!';
  });
}
