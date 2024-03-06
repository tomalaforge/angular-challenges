import { Component, computed, signal } from '@angular/core';

/*
// Using `as const` can be a great alternative to either.
// You gain flexibility and consistency with such an implementation. Also, less complicated. 
// [See this Matt Pocock video for more](https://www.youtube.com/watch?v=jjMbPt_H3RQ) 

const Difficulty = {
  EASY: 'easy',
  NORMAL: 'normal'
} as const;

// Object.values(enum) can be useful to spot differences between enums and const enums.  
*/

type Difficulty = 'easy' | 'normal';

//type AllowedDirections = 'left' | 'right';

type Directions = {
  left: string;
  right: string;
};

/*
// dont think you need to declare a MappedType yourself
// the correct mapped type will be inferred automatically with Readonly
// can add modifiers to MappedType -> `readonly`

// Check this [YouTube Video](https://www.youtube.com/watch?v=fn12l_8LfxI)

type MappedType = {
  [K in AllowedDirections]: string;
};
*/

const DirectionMap: Readonly<Directions> = {
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

  readonly direction = signal<keyof Directions | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    switch (this.difficulty()) {
      case 'easy':
        return 'easy';
      case 'normal':
        return 'normal';
    }
  });

  // either string or key seems to work
  readonly directionLabel = computed<string>(() => {
    const prefix = 'You choose to go';
    switch (this.direction()) {
      case 'left':
        return `${prefix} ${DirectionMap.left}`;
      case DirectionMap.right:
        return `${prefix} ${DirectionMap.right}`;
      default:
        return 'Choose a direction!';
    }
  });
}
