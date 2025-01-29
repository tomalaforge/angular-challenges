import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  output,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p data-testid="counter">Counter: {{ counter() }}</p>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="send.emit(counter())">Send</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  initialValue = input.required<number>();
  public counter = linkedSignal(() => this.initialValue());

  send = output<number>();

  public increment = () => {
    this.counter.set(this.counter() + 1);
  };

  public decrement = () => {
    this.counter.set(this.counter() - 1);
  };
}
