import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HoldableDirective } from './holdable';

@Component({
  imports: [HoldableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          appHoldable
          [startValue]="currentValue()"
          [endValue]="maxValue"
          (hold)="onHold($event)"
          (cancelled)="onHoldCancelled()"
          (finished)="onHoldFinished()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="currentValue()" [max]="maxValue"></progress>

        @if (finished()) {
          <p>Finished!</p>
        }
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly currentValue = signal(0);
  protected readonly finished = signal(false);

  protected readonly maxValue = 10;

  onHold(val: number): void {
    this.currentValue.set(val);
  }

  onHoldFinished(): void {
    this.finished.set(true);
    this.currentValue.set(this.maxValue);
  }

  onHoldCancelled() {
    this.currentValue.set(0);
    this.finished.set(false);
  }
}
