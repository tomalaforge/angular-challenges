import { Component, signal, computed } from '@angular/core';

// Union types for difficulty and direction
type Difficulty = 'easy' | 'normal';
type Direction = 'left' | 'right' | undefined;

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="setDifficulty('easy')">Easy</button>
        <button mat-stroked-button (click)="setDifficulty('normal')">Normal</button>
      </div>
      <p>Selected Difficulty: {{ difficultyLabel() }}</p>
    </section>

    <section>
      <div>
        <button mat-stroked-button (click)="setDirection('left')">Left</button>
        <button mat-stroked-button (click)="setDirection('right')">Right</button>
      </div>
      <p>{{ directionLabel() }}</p>
    </section>
  `,
  styles: [
    `
      section {
        margin: auto;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      section > div {
        display: flex;
        gap: 10px;
      }
      button {
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid;
      }
    `,
  ],
})
export class AppComponent {
  // Signals for difficulty and direction
  difficulty = signal<Difficulty>('easy');
  direction = signal<Direction>(undefined);

  // Computed signal for difficulty label
  difficultyLabel = computed(() => `Difficulty: ${this.difficulty()}`);

  // Computed signal for direction label
  directionLabel = computed(() => {
    const direction = this.direction();
    return direction ? `You chose to go ${direction}` : 'Choose a direction!';
  });

  // Methods to update signals
  setDifficulty(level: Difficulty) {
    this.difficulty.set(level);
  }

  setDirection(dir: Direction) {
    this.direction.set(dir);
  }
}
