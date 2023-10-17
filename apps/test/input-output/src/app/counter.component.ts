import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { ComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe, LetDirective],
  template: `
    <ng-container *ngrxLet="counter$ as counter">
      <p data-testid="counter">Counter: {{ counter }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="send.emit(counter)">Send</button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent extends ComponentStore<{ counter: number }> {
  @Input() set initialValue(initialValue: number) {
    this.patchState({ counter: initialValue });
  }

  @Output() send = new EventEmitter<number>();

  readonly counter$ = this.select((state) => state.counter);

  readonly increment = this.updater((state) => ({
    counter: state.counter + 1,
  }));
  readonly decrement = this.updater((state) => ({
    counter: state.counter - 1,
  }));

  constructor() {
    super({ counter: 0 });
  }
}
