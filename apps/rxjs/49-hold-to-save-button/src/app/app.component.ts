import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HoldableDirective } from './holdable.directive';

@Component({
  standalone: true,
  imports: [HoldableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          [appHoldable]="TRIGGER_TIME"
          (appHoldableTime)="elapsed.set($event)"
          (appHoldableDone)="onSend()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="elapsed()" [max]="TRIGGER_TIME"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly elapsed = signal(0);
  readonly TRIGGER_TIME = 1000;

  onSend() {
    console.log('Save it!');
  }
}
